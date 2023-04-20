import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";


export const userResolvers = {
  Query: {
    getUser: async (parent: any, args: any) => {
      try {
        const response = await db.query('select * from users where id = $1', [args.id]);
        return response.rows[0];   
      } catch(e:any) {
        throwGQLError(e.message);
      }
    },
    getUserPrefs: async (parent:any, args: any) => {
      try {
        const response = await db.query('select * from user_prefs where user_id = $1', [args.user_id]);
        return response.rows[0];
      } catch(e:any) {
        throwGQLError(e.message);
      }
    },
    
  }
}

export const userTypeDefs = `#graphql
  type Query {
    getUser(id: ID!): User,
    getUserPrefs(user_id: ID!): UserPrefs
  }
`;