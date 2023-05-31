import db from "@/utility/db";
import bcrypt from 'bcrypt';
import { GraphQLError } from "graphql";
import uuid from "react-uuid";

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
      if (!columns.length) throw new GraphQLError('No patch arguments provided.');

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
      if (!columns.length) throw new GraphQLError('No patch arguments provided.');

      query += columns.join(', ') + ' where registered_user_id = $1 returning *';
      const response = await db.query(query, params);
      return response.rows[0];
    },
    registerUserWithCredentials: async (_: any, args: any) => {
      const { name, email, password } = args.credentials;
      let id = uuid();
      let user: any = null;
      const hash = await bcrypt.hash(password, 12);

      try {
        await db.query('begin');

        const existingCredentials = await db.query('select * from federated_credentials where email = $1', [email]);
        if (existingCredentials.rowCount) {
          // If the user has already created an account with email/password strategy
          if (existingCredentials.rows.some((cred: any) => cred.provider === 'credentials')) {
            throw new GraphQLError('e:USER_EXISTS | An account already exists with the specified email.');
          }

          // If the user has an account with a separate strategy, but same email, we use their existing registered_user id
          id = existingCredentials.rows[0].registered_user_id;
        } else {
          // The most common case, where a user is registering for the first time
          const userResponse = await db.query(`
            insert into registered_user (id, name, email, created)
            values ($1, $2, $3, $4)
            returning *`
          , [id, name, email, new Date().toISOString()]);
          await db.query('insert into user_prefs (registered_user_id) values ($1)', [id])
          user = userResponse.rows[0];
        }

        await db.query(`
          insert into federated_credentials (provider, registered_user_id, email, credential)
          values ($1, $2, $3, $4) returning *
        `, ['credentials', id, email, hash]);

        await db.query('commit');
      } catch(e) {
        await db.query('rollback');
        throw e;
      }
      
      if (!user) {
        const userResponse = await db.query('select * from registered_user where id = $1', [id]);
        user = userResponse.rows[0];
      }

      return user;
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

  input CredentialsInput {
    name: String!,
    email: String!,
    password: String!,
  }

  type Query {
    getUser(id: ID!): RegisteredUser,
    getUserBusinesses(user_id: ID!): [Business!]!,
    getUserAvailability(user_id: ID!): [AvailabilitySlice!]!,
  }

  type Mutation {
    patchUser(user_id: ID!, patch: UserPatch!): RegisteredUser!,
    patchUserPrefs(user_id: ID!, patch: UserPrefsPatch!): UserPrefs!,
    registerUserWithCredentials(credentials: CredentialsInput!): RegisteredUser!,
  }
`;