import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

export const appointmentsResolvers = {
  Mutation: {
    addEditAppointment: async (_: any, args: any) => {
      const { id, staff_id, service_id, business_id, client_id, start_date, end_date, service_cost, is_video, is_paid, service_duration } = args.appointment; 
      const query = args.edit 
        // update existing appointment
          ? `update appointment set
          staff_id = $2, service_id = $3, business_id = $4, client_id = $5, start_date = $6, end_date = $7, service_cost = $8, is_video = $9, is_paid = $10, service_duration = $11 
          where id = $1 returning *`
        // create new appointment
          : `insert into appointment values (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
          ) returning *`
      ;

      const response = await db.query(query, [id, staff_id, service_id, business_id, client_id, start_date, end_date, service_cost, is_video, is_paid, service_duration]);
      return response.rows[0];
    },
    deleteAppointment: async (_: any, args: any) => {
      const response = await db.query('delete from appointment where id = $1 returning id', [args.id]);
      return response.rows[0].id;
    },
  },
  Query: {
    getUserAppointments: async (_: any, args: any) => {
      const { registered_user_id, range_start, range_end } = args;

      const staffIdsResponse = await db.query('select id from staff where registered_user_id = $1', [registered_user_id]);
      console.log(staffIdsResponse.rows);
      if (!staffIdsResponse.rowCount) return [];

      let query = 'select * from appointment where (';
      const params: string[] = [...staffIdsResponse.rows.map(r => r.id)];
      let paramCount = 1;

      staffIdsResponse.rows.forEach(() => query += `staff_id = $${paramCount++} or `);
      query = query.slice(0, -4) + ')'; // remove trailing ' or ' and add close parenthesis
      
      if (range_start && range_end) {
        params.push(range_start, range_end);
        query += ` and (start_date >= $${paramCount++} and start_date <= $${paramCount++})`;
      }

      const response = await db.query(query, params);
      return response.rows;
    },
    getClientAppointments: async (parent: any, args: any) => {
      try {
        const response = await db.query('select * from appointment where client_id = $1', [args.client_id]);

        if (!response.rowCount) {
          return [];
        }
        return response.rows;
      } catch(e: any) {
        throwGQLError(e.message)
      }
    },
  },
  
  
  Appointment: {
    service: async (parent: any) => {
      const response = await db.query('select * from service where id = $1', [parent.service_id]);
      return response.rows[0];
    },
    business: async (parent: any) => {
      const response = await db.query('select * from business where id = $1', [parent.business_id]);
      return response.rows[0];
    },
    client: async (parent: any) => {
      const response = await db.query('select * from client where id = $1', [parent.client_id]);
      return response.rows[0];
    },
  }
}

export const appointmentsTypeDefs = `#graphql
  input AppointmentInput {
    id: String!,
    staff_id: String!,
    service_id: String!,
    business_id: String!,
    client_id: String!,
    start_date: String!,
    end_date: String!,
    service_cost: Int!,
    is_video: Boolean!,
    is_paid: Boolean!,
    service_duration: Int!,
  }

  type Query {
    getUserAppointments(registered_user_id: ID!, range_start: String, range_end: String): [Appointment!]!,
    getClientAppointments(client_id: ID!): [Appointment!]!,
  }
  type Mutation {
    addEditAppointment(appointment: AppointmentInput!, edit: Boolean): Appointment!,
    deleteAppointment(id: String!): String!,
  }
`;
