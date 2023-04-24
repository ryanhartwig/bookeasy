import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";
import { QueryResult } from "pg";

export const appointmentsResolvers = {
  Mutation: {
    addEditAppointment: async (parent: any, args: any) => {
      try {
        const { id, user_id, service_id, business_id, client_id, start_date, end_date, service_cost, is_video, is_paid, service_duration } = args.appointment; 

        const query = args.edit 
          // update existing appointment
            ? `update appointment set
            user_id = $2, service_id = $3, business_id = $4, client_id = $5, start_date = $6, end_date = $7, service_cost = $8, is_video = $9, is_paid = $10, service_duration = $11 
            where id = $1 returning *`
          // create new appointment
            : `insert into appointment values (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
            ) returning *`
        ;

        const response = await db.query(query, [id, user_id, service_id, business_id, client_id, start_date, end_date, service_cost, is_video, is_paid, service_duration])
        console.log(response.rows);
        return response.rows[0];
      } catch(e: any) {
        throwGQLError(e.message)
      }
    }
  },
  Query: {
    getUserAppointments: async (parent: any, args: any) => {
      try {
        const { user_id, range_start, range_end } = args;
        const params = [user_id];
        let query = 'select * from appointment where user_id = $1'
        
        if (range_start && range_end) {
          params.push(range_start, range_end);
          query += ' and start_date >= $2 and start_date <= $3';
        }

        const response = await db.query(query, params);

        if (!response.rowCount) {
          return [];
        }
        return response.rows;
      } catch(e: any) {
        throwGQLError(e.message)
      }
    }
  },
  
  Appointment: {
    service: async (parent: any) => {
      const response = await db.query('select name, duration, color from service where id = $1', [parent.service_id]);
      const { name, duration, color } = response.rows[0];

      if (!name || !duration || !color) throwGQLError(`No service found for appointment with id: ${parent.id} and service_id: ${parent.service_id}`);
      
      return {
        name,
        duration,
        color,
      }
    },
    business: async (parent: any) => {
      const response = await db.query('select name from business where id = $1', [parent.business_id]);

      if (!response.rowCount) throwGQLError(`No business found for appointment with id: ${parent.id}, business_id: ${parent.business_id}`);

      return {
        name: response.rows[0].name,
      }
    },
    client: async (parent: any) => {
      const response = await db.query('select name from client where id = $1', [parent.client_id]);

      if (!response.rowCount) throwGQLError(`No client found for appointment with id: ${parent.id}, client_id: ${parent.client_id}`);

      return {
        name: response.rows[0].name,
      }
    },
  }
}

export const appointmentsTypeDefs = `#graphql
  input AppointmentInput {
    id: String!,
    user_id: String!,
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
    getUserAppointments(user_id: ID!, range_start: String, range_end: String): [Appointment!]!,
  }
  type Mutation {
    addEditAppointment(appointment: AppointmentInput!, edit: Boolean): Appointment!,
  }
`;

