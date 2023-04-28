import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

export const businessResolvers = {
  Query: {
    getBusiness: async (parent: any, args: any) => {
      const response = await db.query('select * from business where id = $1', [args.business_id]);
      if (!response.rows[0]) throwGQLError(`No business found for id: ${args.business_id}`);
      return response.rows[0];
    },
    getBusinessClients: async (parent: any, args: any) => {
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
    getBusinessServices: async (parent: any, args: any) => {
      try {
        const response = await db.query('select * from service where business_id = $1', [args.business_id]);
        return response.rows;
      } catch(e: any) {
        throwGQLError(e.message);
      }
    }
  },
  Service: {
    assigned_users: async (parent: any) => {
      try {
        const userIdsResponse = await db.query('select user_id from users_services where service_id = $1', [parent.id]);

        if (!userIdsResponse.rows[0]) throwGQLError('Could not find assigned users for service with id: ' + parent.id);

        const assigned_users: any[] = [];

        for (const { user_id } of userIdsResponse.rows) {
          const response = await db.query('select id, name, avatar from users where id = $1', [user_id]);
          assigned_users.push(response.rows[0]);
        }

        return assigned_users;
      } catch(e: any) {
        throwGQLError(e.message);
      }
    },
  },
}

export const businessTypeDefs = `#graphql
  type Query {
    getBusiness(business_id: ID!): Business!,
    getBusinessClients(business_id: ID!): [BusinessClient!]!,
    getBusinessServices(business_id: ID!): [Service!]!,
  }
`;