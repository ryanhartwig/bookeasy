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
          query += ' and start_date <= $2 and end_date >= $3';
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
}

export const appointmentsTypeDefs = `#graphql
  type Query {
    getUserAppointments(user_id: ID!, start_date: String, end_date: String): [Appointment!]!,
  }
`;