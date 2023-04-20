import db from "@/utility/db";
import { throwError } from "@/utility/gql/throwError";

export const userResolvers = {
  Query: {
    getUser: async (parent: any, args: any) => {

      const response = await db.query('select * from users where id = $1', [args.id]);
      
    }
  }
}

export const userTypeDefs = `#graphql
  type Query {
    getUser(id: ID!): User!,
    # getUserPrefs(user_id: ID!): UserPrefs
  }
`;