import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

export const businessResolvers = {
  Query: {
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
}

export const businessTypeDefs = `#graphql
  type Query {
    getBusinessClients(business_id: ID!): [BusinessClient!]!,
    getBusinessServices(business_id: ID!): [Service!]!,
  }
`;