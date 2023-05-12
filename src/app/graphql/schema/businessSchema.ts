import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";
import uuid from "react-uuid";

export const businessResolvers = {
  Query: {
    getBusiness: async (_: any, args: any) => {
      const response = await db.query('select * from business where id = $1', [args.business_id]);
      if (!response.rows[0]) throwGQLError(`No business found for id: ${args.business_id}`);
      return response.rows[0];
    },
    getBusinessClients: async (_: any, args: any) => {
      const response = await db.query(`
        select coalesce(c.email, rc.email) as email, c.id, c.address, c.phone, c.joined_date, c.active, c.notes, c.name, rc.avatar
        from client c
        left join registered_client rc
        on rc.id = c.registered_client_id
        where business_id = $1
      `, [args.business_id]);
      return response.rows;
    },
    getBusinessServices: async (_: any, args: any) => {
      try {
        const response = await db.query('select * from service where business_id = $1', [args.business_id]);
        return response.rows;
      } catch(e: any) {
        throwGQLError(e.message);
      }
    },
    getBusinessAppointmentMetrics: async (_: any, args: any) => {
      const { business_id, start_date, end_date } = args;
      
      let query = 'select is_paid, service_cost from appointment where business_id = $1';
      const params = [business_id];

      if (start_date && end_date) {
        params.push(start_date, end_date);
        query += ' and start_date between $2 and $3';
      }
      
      const response = await db.query(query, params);
      return response.rows;
    }
  },
  Service: {
    assigned_staff: async (parent: any) => {
      const response = await db.query(`
        select s.*, u.avatar 
        from staff s
        left join registered_user u
        on s.registered_user_id = u.id
        where s.id in (
          select staff_id from staff_services
          where service_id = $1
        )
      `, [parent.id]);
      return response.rows;
    },
  },
  Business: {
    staff: async (parent: any) => {
      const response = await db.query(`
        select s.*, u.avatar 
        from staff s
        left join registered_user u
        on s.registered_user_id = u.id
        where business_id = $1
      `, [parent.id]);
      return response.rows;
    }
  },
  Mutation: {
    updateBusinessPrefs: async (_: any, args: any) => {
      const { business_id, patch } = args;
      const params = [business_id];
      let query = 'update business set ';

      const columns = Object.keys(patch).map((key, i) => {
        params.push(patch[key]);
        return `${key} = $${i + 2}`;
      });
      if (!columns.length) throwGQLError('No patch arguments provided.');

      query += columns.join(', ') + ' where id = $1 returning *';

      const response = await db.query(query, params);
      return response.rows[0];
    },
    newBusiness: async (_: any, args: any) => {
      const { name, user_id, is_own } = args;
      const created = new Date().toISOString();
      const response = await db.query(`
        insert into business (id, name, created, is_own)
        values (
          $1, $2, $3, $4
        ) returning *
      `, [uuid(), name, created, is_own]);

      // Add entry to staff mapping table
      await db.query(`
        with ru as (
          select name from registered_user
          where id = $1
        )
        insert into staff (registered_user_id, business_id, elevated, date_added, name, id)
        select $1, $2, $3, $4, ru.name, $5
        from ru
      `, [user_id, response.rows[0].id, true, created, uuid()]);
      return response.rows[0];
    },
    removeBusiness: async (_: any, args: any) => {
      const response = await db.query('delete from business where id = $1 returning id', [args.business_id]);
      return response.rows[0].id;
    },
  }
}

export const businessTypeDefs = `#graphql
  input BusinessPrefsInput {
    name: String,
    email: String,
    phone: String,
    avatar: String,
    min_booking_notice: String,
    max_book_ahead: String,
    min_cancel_notice: String,
  }

  type Query {
    getBusiness(business_id: ID!): Business!,
    getBusinessClients(business_id: ID!): [Client!]!,
    getBusinessServices(business_id: ID!): [Service!]!,
    getBusinessAppointmentMetrics(business_id: ID!, start_date: String, end_date: String): [AppointmentMetric!]!,
  }

  type Mutation {
    updateBusinessPrefs(business_id: ID!, patch: BusinessPrefsInput): Business!,
    newBusiness(name: String!, user_id: String!, is_own: Boolean): Business!,
    removeBusiness(business_id: String!): String!,
  }
`;