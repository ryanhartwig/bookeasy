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
    getUserBusinesses: async (parent: any, args: any) => {
      try {
        const ids = await db.query('select business_id from users_businesses where user_id = $1', [args.user_id]);
        if (!ids.rowCount) return [];

        const businesses: any[] = [];

        for (const { business_id } of ids.rows) {
          const response = await db.query('select * from business where id = $1', [business_id]);
          businesses.push(response.rows[0]);
        }

        return businesses;
      } catch(e: any) {
        throwGQLError(e.message)
      }
    }
  },
  User: {
    own_business: async (parent: any, args: any) => {
      try {
        const { own_business_id } = parent;
        const response = await db.query('select * from business where id = $1', [own_business_id]);
        return response.rows[0];
      } catch(e: any) {
        throwGQLError(e.message)
      }
    }
  }
}

export const userTypeDefs = `#graphql
  type Query {
    getUser(id: ID!): User,
    getUserPrefs(user_id: ID!): UserPrefs,
    getUserBusinesses(user_id: ID!): [Business!]!,
  }

  type User {
    something: String!,
  }
`;