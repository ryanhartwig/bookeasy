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
    getUserBusinesses: async (parent: any, args: any) => {
      try {
        const ids = await db.query('select business_id from users_businesses where user_id = $1', [args.user_id]);

        const businesses: any[] = [];

        if (ids.rowCount) {
          for (const { business_id } of ids.rows) {
            const response = await db.query('select * from business where id = $1', [business_id]);
            businesses.push(response.rows[0]);
          }
        }

        // query user_id on business
        const response = await db.query('select * from business where user_id = $1', [args.user_id]);
        if (response.rowCount) businesses.push(response.rows[0]);
        
        return businesses;
      } catch(e: any) {
        throwGQLError(e.message)
      }
    },
    getUserAvailability: async (parent: any, args: any) => {
      try {
        const response = await db.query('select * from availability_slice where user_id = $1', [args.user_id]);
        return response.rows;
      } catch(e: any) {
        throwGQLError(e.message)
      }
    },
    getUserOwnBusiness: async (parent: any, args: any) => {
      const response = await db.query('select * from business where user_id = $1', [args.user_id]);
      return response.rows[0];
    }
  },
  User: {
    prefs: async (parent:any, args: any) => {
      try {
        const response = await db.query('select * from user_prefs where user_id = $1', [parent.id]);
        return response.rows[0];
      } catch(e:any) {
        throwGQLError(e.message);
      }
    },
  },
}

export const userTypeDefs = `#graphql
  type Query {
    getUser(id: ID!): User,
    getUserBusinesses(user_id: ID!): [Business!]!,
    getUserAvailability(user_id: ID!): [AvailabilitySlice!]!,
    getUserOwnBusiness(user_id: ID!): Business!,
  }
`;