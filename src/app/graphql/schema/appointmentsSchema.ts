import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

export const appointmentsResolvers = {
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
    }
  }
}

export const appointmentsTypeDefs = `#graphql
  type Query {
    getUserAppointments(user_id: ID!, range_start: String, range_end: String): [Appointment!]!,
  }
`;