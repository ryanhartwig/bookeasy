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
        with business_ids as (
          select business_id from staff
          where registered_user_id = $1
        )
        select * from business
        where id in (
          select * from business_ids
        )
      `, [args.user_id]);
      return response.rows;
    },
    getUserAvailability: async (_: any, args: any) => {
      const response = await db.query(`
        with staff_ids as (
          select id from staff
          where registered_user_id = $1
        )
        select * from availability_slice
        where staff_id in (
          select * from staff_ids
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
    setUserAvailability: async (_: any, args: any) => {
      const { staff_id, business_id, day, slices} = args;

      // Remove existing slices for current day
      await db.query('delete from availability_slice where staff_id = $1 and business_id = $2 and day = $3', [staff_id, business_id, day]);

      for (const slice of slices) {
        const { start_time, end_time } = slice;
        await db.query('insert into availability_slice values ($1, $2, $3, $4, $5)', [staff_id, business_id, day, start_time, end_time]);
      }

      return staff_id;
    },
    patchUser: async (_: any, args: any) => {
      const { user_id, patch } = args;
      const params = [user_id];
      let query = 'update registered_user set ';

      for (const key in patch) {
        params.push(patch[key]);
        query += `${key} = $${params.length}, `;
      }

      if (params.length === 1) throwGQLError('No patch arguments provided.');
      
      query = query.slice(0, -2);
      query += ' where id = $1 returning *';

      const response = await db.query(query, params);
      return response.rows[0];
    },
    patchUserPrefs: async (_: any, args: any) => {
      const { user_id, patch } = args;
      const params = [user_id];
      let query = 'update user_prefs set ';

      for (const key in patch) {
        params.push(patch[key]);
        query += `${key} = $${params.length}, `;
      }
      if (params.length === 1) throwGQLError('No patch arguments provided.');
      
      query = query.slice(0, -2);
      query += ' where registered_user_id = $1 returning *';

      const response = await db.query(query, params);
      return response.rows[0];
    },
  }
}

export const userTypeDefs = `#graphql
  type Query {
    getUser(id: ID!): RegisteredUser,
    getUserBusinesses(user_id: ID!): [Business!]!,
    getUserAvailability(user_id: ID!, business_id: ID): [AvailabilitySlice!]!,
  }

  input AvailabilitySliceInput {
    staff_id: String!,
    business_id: String!,
    day: Int!,
    start_time: String!,
    end_time: String!,
  }

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

  type Mutation {
    setUserAvailability(staff_id: ID!, business_id: ID!, day: Int!, slices: [AvailabilitySliceInput!]!): String!,
    patchUser(user_id: ID!, patch: UserPatch): RegisteredUser!,
    patchUserPrefs(user_id: ID!, patch: UserPrefsPatch): UserPrefs!,
  }
`;