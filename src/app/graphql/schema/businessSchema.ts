import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

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
        const { elevated, date_added } = ownUser.rows[0];

        businessUsers.push({
          user: ownUser.rows[0],
          date_added,
          elevated,
        });
      }

      if (!businessUsers.length) throwGQLError('Could not fetch users for business with id: ' + parent.id);
      
      return businessUsers;
    }
  },
  Mutation: {
    updateBusinessPrefs: async (_: any, args: any) => {
      const { name, email, phone, avatar } = args.patch;
      if (!name && !email && !phone && !avatar) throwGQLError('Must provide at least one argument to update');

      const { business_id } = args;

      let query = 'update business set';
      const params = [business_id];

      // Only one of the following properties will be provided
      if (name) {
        query += ' name = $2 where id = $1 returning id';
        params.push(name);
      }
      if (email) {
        query += ' email = $2 where id = $1 returning id';
        params.push(email);
      }
      if (phone) {
        query += ' phone = $2 where id = $1 returning id';
        params.push(phone);
      }
      if (avatar) {
        query += ' avatar = $2 where id = $1 returning id';
        params.push(avatar);
      }

      const response = await db.query(query, params);
      return response.rows[0].id;
    },
  }

}

export const businessTypeDefs = `#graphql
  input BusinessPrefsInput {
    name: String,
    email: String,
    phone: String,
    avatar: String,
  }

  type Query {
    getBusiness(business_id: ID!): Business!,
    getBusinessClients(business_id: ID!): [BusinessClient!]!,
    getBusinessServices(business_id: ID!): [Service!]!,
    getBusinessAppointmentMetrics(business_id: ID!, start_date: String, end_date: String): [AppointmentMetric!]!,
  }

  type Mutation {
    updateBusinessPrefs(business_id: ID!, patch: BusinessPrefsInput): String!,
  }
`;