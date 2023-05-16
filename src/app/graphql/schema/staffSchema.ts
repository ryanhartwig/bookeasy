import db from "@/utility/db";
import uuid from "react-uuid";

export const staffResolvers = {
  Query: {
    getStaffAvailability: async (_: any, args: any) => {
      const response = await db.query(`
        select * from availability_slice 
        where staff_id = $1
      `, [args.staff_id]);
      return response.rows;
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
    addStaff: async(_: any, args: any) => {
      const { name, contact_email, contact_phone, business_id } = args.staff;
      const response = await db.query(`
        insert into staff (name, contact_email, contact_phone, business_id, elevated, date_added, id)
        values ($1, $2, $3, $4, false, $5, $6)
        returning *
      `, [name, contact_email, contact_phone, business_id, new Date().toISOString(), uuid()]);
      return {
        ...response.rows[0],
        avatar: null,
      };
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

  type Query {
    getStaffAvailability(staff_id: ID!): [AvailabilitySlice!]!,
  }

  type Mutation {
    setStaffAvailability(staff_id: ID!, business_id: ID!, day: Int!, slices: [AvailabilitySliceInput!]!): String!,
    addStaff(staff: StaffInput!): Staff,
  }
`;