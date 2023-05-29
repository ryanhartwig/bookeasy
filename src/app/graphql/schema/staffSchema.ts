import db from "@/utility/db";
import uuid from "react-uuid";
import nodemailer from 'nodemailer';
import { generateTeamInviteHTML } from "./emailHTML/generateTeamInviteHTML";

export const staffResolvers = {
  Query: {
    getStaffAvailability: async (_: any, args: any) => {
      const response = await db.query(`
        select * from availability_slice 
        where staff_id = $1
      `, [args.staff_id]);
      return response.rows;
    },
    getRegistrationDetails: async (_: any, args: any) => {
      const { pending_registration_id } = args;

      const response = await db.query('select * from pending_registration where id = $1', [pending_registration_id]);
      if (!response.rowCount) return { error: "notfound" }
      
      const { expires } = response.rows[0];
      if (new Date().toISOString() > expires) return { error: "expired" }

      return response.rows[0];
    },
  },
  Mutation: {
    setStaffAvailability: async (_: any, args: any) => {
      const { staff_id, business_id, day, slices} = args;

      // Remove existing slices for current day
      await db.query('delete from availability_slice where staff_id = $1 and business_id = $2 and day = $3', [staff_id, business_id, day]);

      for (const slice of slices) {
        const { start_time, end_time } = slice;
        await db.query('insert into availability_slice values ($1, $2, $3, $4, $5)', [staff_id, business_id, day, start_time, end_time]);
      }

      return staff_id;
    },
    addStaff: async (_: any, args: any) => {
      const { name, contact_email, contact_phone, business_id } = args.staff;
      const response = await db.query(`
        insert into staff (name, contact_email, contact_phone, business_id, elevated, date_added, id, deleted)
        values ($1, $2, $3, $4, false, $5, $6, false)
        returning *
      `, [name, contact_email, contact_phone, business_id, new Date().toISOString(), uuid()]);
      return {
        ...response.rows[0],
        avatar: null,
      };
    },
    editStaff: async (_: any, args: any) => {
      const { id, name, contact_email, contact_phone } = args.staff;
      const response = await db.query(`
      update staff set
        name = $2,
        contact_email = $3,
        contact_phone = $4
      where id = $1
      returning *`
      , [id, name, contact_email, contact_phone]);

      return response.rows[0];
    },
    deleteStaff: async (_: any, args: any) => {
      const { staff_id } = args;

      // Unassign staff from services
      await db.query(`
        delete from staff_services 
        where staff_id = $1
      `, [staff_id]);

      // Remove scheduled appointments
      await db.query(`
        delete from appointment
        where staff_id = $1
        and start_date > $2
      `, [staff_id, new Date().toISOString()]);

      // Attempt to delete the staff
      try {
        const response = await db.query('delete from staff where id = $1 returning id', [staff_id]);
        return response.rows[0].id;
      } catch(e: any) {
        if(e?.constraint && e.constraint === 'appointment_staff_id_fkey') {
          // Appointment exists for service and won't allow full deletion
          // - therefore we set deleted property to true, to allow appointments to ref service
          const updateResponse = await db.query('update staff set deleted = true where id = $1 returning id', [staff_id]);
          return updateResponse.rows[0].id;
        }
      }
    },
    addPendingRegistration: async (_: any, args: any) => {
      const { email, staff_id, team_name, business_id, elevated } = args;
      const expires = new Date();
      expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24) // 1 day expiry

      const pending_registration_id = uuid();
      
      const response = await db.query(`
        insert into pending_registration(id, associated_email, expires, staff_id, business_id) 
        values ($1, $2, $3, $4, $5)
        returning *
      `, [pending_registration_id, email, expires, staff_id, business_id]);
      if (!response.rowCount) throw new Error('Could not add registration details');

      // Link pending registration record to staff member
      await db.query(`
        update staff set pending_registration_id = $1, elevated = $2 where id = $3
      `, [pending_registration_id, elevated, staff_id]);

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'noreply.bookeasy@gmail.com',
          pass: 'aihxajjxbwawteuf',
        },
        from: 'noreply.bookeasy@gmail.com',
      });

      await transporter.sendMail({
        from: 'noreply.bookeasy@gmail.com',
        to: email,
        subject: `You've received an invitation to join ${team_name}!`,
        html: generateTeamInviteHTML(`http://localhost:3000/login?redirect_id=${pending_registration_id}`)
      });
      
      return response.rows[0].id;
    },
    deletePendingRegistration: async (_: any, args: any) => {
      const { id } = args;
      const response = await db.query('delete from pending_registration where id = $1 returning id', [id]);
      return response.rows[0].id;
    },
    acceptPendingRegistration: async (_: any, args: any) => {
      const { staff_id, registered_user_id } = args;
      const response = await db.query('update staff set registered_user_id = $1 where id = $2 returning id', [registered_user_id, staff_id]);
      return response.rows[0].id;
    },
    unregisterUser: async (_: any, args: any) => {
      const { staff_id } = args;
      const response = await db.query('update staff set registered_user_id = null, elevated = false where id = $1 returning *', [staff_id]);
      return response.rows[0];
    },
  }
}

export const staffTypeDefs = `#graphql
  input AvailabilitySliceInput {
    staff_id: String!,
    business_id: String!,
    day: Int!,
    start_time: String!,
    end_time: String!,
  }

  input StaffInput {
    id: String,
    business_id: String!,
    name: String!,
    contact_email: String,
    contact_phone: String,
  }

  type RegistrationDetails {
    error: String,
    staff_id: String,
    business_id: String,
    associated_email: String,
    expires: String,
    id: String,
    client_id: String,
  }

  type Query {
    getStaffAvailability(staff_id: ID!): [AvailabilitySlice!]!,
    getRegistrationDetails(pending_registration_id: String!): RegistrationDetails!,
  }

  type Mutation {
    setStaffAvailability(staff_id: ID!, business_id: ID!, day: Int!, slices: [AvailabilitySliceInput!]!): String!,
    addStaff(staff: StaffInput!): Staff!,
    editStaff(staff: StaffInput!): Staff!,
    deleteStaff(staff_id: String!): String!,
    addPendingRegistration(email: String!, staff_id: String!, elevated: Boolean!, team_name: String!, business_id: String!): String!,
    deletePendingRegistration(id: String!): String!,
    acceptPendingRegistration(staff_id: String!, registered_user_id: String!): String!,
    unregisterUser(staff_id: String!): Staff!,
  }
`;