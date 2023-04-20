import db from "@/utility/db";
import { throwError } from "@/utility/gql/throwError";

export const userResolvers = {
  Query: {
    getUser: async (parent: any, args: any) => {
      const { id } = args;

      if (!id) {
        throwError('No id argument provided');
      }
      
      const response = await db.query('select * from users where id = $1', [args.id]);

      return response.rows[0];      
    }
  }
}

export const userTypeDefs = `#graphql
  type Query {
    getUser(id: ID!): User!,
    # getUserPrefs(user_id: ID!): UserPrefs
  }
`;