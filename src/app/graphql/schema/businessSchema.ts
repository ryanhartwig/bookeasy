import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";
import uuid from "react-uuid";

export const businessResolvers = {
  Query: {
    getBusiness: async (_: any, args: any) => {
      const response = await db.query('select * from business where id = $1', [args.business_id]);
      if (!response.rows[0]) throwGQLError(`No business found for id: ${args.business_id}`);
      return response.rows[0];
    },
    getBusinessClients: async (_: any, args: any) => {
      try {
        const clientIds = await db.query('select * from clients_businesses where business_id = $1', [args.business_id]);

        if (!clientIds.rowCount) {
          return [];
        }

        const clients: any[] = [];

        for (const businessClient of clientIds.rows) {
          const response = await db.query('select * from client where id = $1', [businessClient.client_id]);
          const overWrites = Object.fromEntries(Object.entries(businessClient).filter(([_, value]) => !!value));

          clients.push({
            ...response.rows[0],
            ...overWrites,
          });
        }

        return clients;
      } catch(e: any) {
        throwGQLError(e.message);
      }
    },
    getBusinessServices: async (_: any, args: any) => {
      try {
        const response = await db.query('select * from service where business_id = $1', [args.business_id]);
        return response.rows;
      } catch(e: any) {
        throwGQLError(e.message);
      }
    },
    getBusinessAppointmentMetrics: async (_: any, args: any) => {
      const { business_id, start_date, end_date } = args;
      
      let query = 'select is_paid, service_cost from appointment where business_id = $1';
      const params = [business_id];

      if (start_date && end_date) {
        query += ' and start_date > $2 and start_date < $3';
        params.push(start_date, end_date);
      }
      
      const response = await db.query(query, params);
      return response.rows;
    }
  },
  Service: {
    assigned_users: async (parent: any) => {
      try {
        const userIdsResponse = await db.query('select user_id from users_services where service_id = $1', [parent.id]);

        if (!userIdsResponse.rows[0]) throwGQLError('Could not find assigned users for service with id: ' + parent.id);

        const assigned_users: any[] = [];

        for (const { user_id } of userIdsResponse.rows) {
          const response = await db.query('select * from users where id = $1', [user_id]);
          assigned_users.push(response.rows[0]);
        }

        return assigned_users;
      } catch(e: any) {
        throwGQLError(e.message);
      }
    },
  },
  Business: {
    users: async (parent: any) => {
      const businessUsers: any[] = [];

      // Fetch business/user relations
      const businessUsersResponse = await db.query('select * from users_businesses where business_id = $1', [parent.id]);
      for (const businessUser of businessUsersResponse.rows) {
        const { user_id, elevated, date_added } = businessUser;
        const userResponse = await db.query('select * from users where id = $1', [user_id]);

        if (!userResponse.rowCount) throwGQLError('Error fetching user with id: ' + user_id);
        
        businessUsers.push({
          user: userResponse.rows[0],
          date_added,
          elevated,
        });
      }

      // Fetch own business user when the property is present
      if (parent.user_id) {
        const ownUser = await db.query('select * from users where id = $1', [parent.user_id]);

        businessUsers.push({
          user: ownUser.rows[0],
          date_added: parent.created,
          elevated: true,
        });
      }

      if (!businessUsers.length) throwGQLError('Could not fetch users for business with id: ' + parent.id);
      
      return businessUsers;
    }
  },
  Mutation: {
    updateBusinessPrefs: async (_: any, args: any) => {
      const { business_id, patch } = args;
      const params = [business_id];
      let query = 'update business set ';
      let paramsCount = 2;

      for (const key in patch) {
        query += `${key} = $${paramsCount}, `;
        paramsCount++;
        params.push(patch[key]);
      }

      if (paramsCount === 2) throwGQLError('No patch arguments provided.');
      
      query = query.slice(0, -2);
      query += ' where id = $1 returning *';

      const response = await db.query(query, params);
      return response.rows[0];
    },
    newBusiness: async (_: any, args: any) => {
      const { name, user_id, is_own } = args;

      const query = `
        insert into business values (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        ) returning *
      `;
      const params = [uuid(), name, null, null, null, null, null, is_own ? user_id : null, null, new Date().toISOString()];
      const response = await db.query(query, params);

      // If creating a business for a newly registered user return early
      if (is_own) {
        return response.rows[0];
      }

      // Add the current user to the users_businesses table with elevated permissions
      const { id: business_id } = response.rows[0];
      await db.query('insert into users_businesses values ($1, $2, $3, $4) returning *'
      , [user_id, business_id, true, new Date().toISOString()]);

      return response.rows[0];
    },
  }

}

export const businessTypeDefs = `#graphql
  input BusinessPrefsInput {
    name: String,
    email: String,
    phone: String,
    avatar: String,
    min_booking_notice: String,
    max_book_ahead: String,
    min_cancel_notice: String,
  }

  type Query {
    getBusiness(business_id: ID!): Business!,
    getBusinessClients(business_id: ID!): [BusinessClient!]!,
    getBusinessServices(business_id: ID!): [Service!]!,
    getBusinessAppointmentMetrics(business_id: ID!, start_date: String, end_date: String): [AppointmentMetric!]!,
  }

  type Mutation {
    updateBusinessPrefs(business_id: ID!, patch: BusinessPrefsInput): Business!,
    newBusiness(name: String!, user_id: String!, is_own: Boolean): Business!,
  }
`;