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
        let query = 'select * from availability_slice where user_id = $1';
        const params = [args.user_id];

        if (args.business_id) {
          query += ' and business_id = $2';
          params.push(args.business_id);
        }

        query += ' order by start_time asc';
        
        const response = await db.query(query, params);
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
  Mutation: {
    setUserAvailability: async (_: any, args: any) => {
      const { user_id, business_id, day, slices} = args;

      // Remove existing slices for current day
      await db.query('delete from availability_slice where user_id = $1 and business_id = $2 and day = $3', [user_id, business_id, day]);

      for (const slice of slices) {
        const { start_time, end_time } = slice;
        const response = await db.query('insert into availability_slice values ($1, $2, $3, $4, $5)', [user_id, business_id, day, start_time, end_time]);
      }

      return user_id;
    },
    updateUserField: async (_: any, args: any) => {
      const { user_id, patch } = args;
      let query = 'update users set ';
      const params = [user_id];
      let paramCount = 2; 

      for (const key in patch) {
        query += `${key} = $${paramCount}, `;
        paramCount++;
        params.push(patch[key]);
      }

      if (paramCount === 2) throwGQLError('No patch fields provided.');
      
      query = query.slice(0, -2);
      query += ' where id = $1';

      console.log(query, params);


      return { id: ''};
    },
  }
}

export const userTypeDefs = `#graphql
  type Query {
    getUser(id: ID!): User,
    getUserBusinesses(user_id: ID!): [Business!]!,
    getUserAvailability(user_id: ID!, business_id: ID): [AvailabilitySlice!]!,
    getUserOwnBusiness(user_id: ID!): Business!,
  }

  input AvailabilitySliceInput {
    user_id: String!,
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

  type Mutation {
    setUserAvailability(user_id: ID!, business_id: ID!, day: Int!, slices: [AvailabilitySliceInput!]!): String!,
    updateUserField(user_id: ID!, patch: UserPatch): User!,
  }
`;