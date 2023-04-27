import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

export const clientResolvers = {
  Mutation: {
    userAddClient: async (parent: any, args: any) => {
      const { id, business_id, notes, name, email, address, phone, joined_date, active } = args.client;
      if (!id || !business_id || !name || !email || !active) throwGQLError('Missing required arguments');

      const clientResponse = await db.query(`insert into client values (
        $1, $2, $3, $4, $5, $6
      ) returning *`, [id, name, email, null, null, null]);

      if (!clientResponse.rows[0]) throwGQLError('Could not add client to client relation');

      const clientBusinessResponse = await db.query(`insert into clients_businesses values (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) returning *`, [id, business_id, notes, name, email, address, phone, joined_date, active]);

      if (!clientBusinessResponse.rows[0]) throwGQLError('Could not create relationship between client and business');

      const overWrites = Object.fromEntries(Object.entries(clientBusinessResponse.rows[0]).filter(([_, value]) => !!value));

      return {
        ...clientResponse.rows[0],
        ...overWrites,
      }
    },
    userEditClient: async (parent: any, args: any) => {
      const { id, notes, name, email, address, phone, active } = args.client;

      const response = await db.query(`update clients_businesses set
        notes = $1,
        name = $2,
        email = $3,
        address = $4,
        phone = $5,
        active = $6
        where client_id = $7
        returning *
      `, [notes, name, email, address, phone, active, id]);

      if (!response.rowCount) throwGQLError('Could not update client');

      return response.rows[0];
    }
  },
}

export const clientTypeDefs = `#graphql
  input UserAddClientInput {
    id: String!,
    business_id: String!,
    notes: String,
    name: String!,
    email: String!,
    address: String,
    phone: String,
    joined_date: String!,
    active: Boolean!
  }

  input UserEditClientInput {
    id: String!,
    notes: String,
    name: String,
    email: String,
    address: String,
    phone: String,
    active: Boolean,
  }

  type Mutation {
    userAddClient(client: UserAddClientInput!): BusinessClient!,
    userEditClient(client: UserEditClientInput!): BusinessClient!,
  }
`;