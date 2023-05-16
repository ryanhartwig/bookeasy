import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

export const userResolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const response = await db.query('select * from registered_user where id = $1', [args.id]);
      return response.rows[0];   
    },
    getUserBusinesses: async (_: any, args: any) => {
      const response = await db.query(`
        select * from business
        where id in (
          select business_id from staff
          where registered_user_id = $1
        )
      `, [args.user_id]);
      return response.rows;
    },
    getUserAvailability: async (_: any, args: any) => {
      const response = await db.query(`
        select * from availability_slice
        where staff_id in (
          select id from staff
          where registered_user_id = $1
        )
      `, [args.user_id]);
      return response.rows;
    },
  },
  RegisteredUser: {
    prefs: async (parent:any, args: any) => {
      const response = await db.query('select * from user_prefs where registered_user_id = $1', [parent.id]);
      return response.rows[0];
    },
  },
  Mutation: {
    patchUser: async (_: any, args: any) => {
      const { user_id, patch } = args;
      const params = [user_id];
      let query = 'update registered_user set ';

      const columns = Object.keys(patch).map((key, i) => {
        params.push(patch[key]);
        return `${key} = $${i + 2}`;
      });
      if (!columns.length) throwGQLError('No patch arguments provided.');

      query += columns.join(', ') + ' where id = $1 returning *';
      const response = await db.query(query, params);
      return response.rows[0];
    },
    patchUserPrefs: async (_: any, args: any) => {
      const { user_id, patch } = args;
      const params = [user_id];
      let query = 'update user_prefs set ';

      const columns = Object.keys(patch).map((key, i) => {
        params.push(patch[key]);
        return `${key} = $${i + 2}`;
      });
      if (!columns.length) throwGQLError('No patch arguments provided.');

      query += columns.join(', ') + ' where registered_user_id = $1 returning *';
      const response = await db.query(query, params);
      return response.rows[0];
    },
  }
}

export const userTypeDefs = `#graphql
  input UserPatch {
    name: String,
    avatar: String,
    email: String,
    phone: String,
  }

  input UserPrefsPatch {
    private_photo: Boolean,
    private_email: Boolean,
    private_phone: Boolean,
    notification_booking: Boolean,
    notification_reminder: Boolean,
    notification_overview: Boolean,
    notification_overview_time: String
  }

  type Query {
    getUser(id: ID!): RegisteredUser,
    getUserBusinesses(user_id: ID!): [Business!]!,
    getUserAvailability(user_id: ID!): [AvailabilitySlice!]!,
  }

  type Mutation {
    patchUser(user_id: ID!, patch: UserPatch!): RegisteredUser!,
    patchUserPrefs(user_id: ID!, patch: UserPrefsPatch!): UserPrefs!,
  }
`;