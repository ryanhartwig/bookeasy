import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

export const clientResolvers = {
  Query: {
    getClientAppointmentCount: async (_: any, args: any) => {
      const response = await db.query('select count(*) from appointment where client_id = $1', [args.client_id]);
      return response.rows[0].count;
    },
  },
  Mutation: {
    userAddClient: async (_: any, args: any) => {
      const { id, business_id, notes, name, email, address, phone, joined_date, active } = args.client;
      if (!id || !business_id || !name || !email || !active) throwGQLError('Missing required arguments');

      const response = await db.query(`
      insert into client (id, business_id, notes, name, email, address, phone, joined_date, active)
      values (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) returning *`, [id, business_id, notes, name, email, address, phone, joined_date, active]);
      return response.rows[0];
    },
    userEditClient: async (_: any, args: any) => {
      const { id, notes, name, email, address, phone, active } = args.client;

      const response = await db.query(`
        with updated_client as (
          update client
          set notes = $1,
              name = $2,
              email = $3,
              address = $4,
              phone = $5,
              active = $6
          where id = $7
          returning *
        )
        select coalesce(c.email, rc.email) as email, c.id, c.address, c.phone, c.joined_date, c.active, c.notes, c.name, rc.avatar
        from updated_client c
        left join registered_client rc
        on rc.id = c.registered_client_id
      `, [notes, name, email, address, phone, active, id]);
      return response.rows[0];
    },
    deleteClient: async (_: any, args: any) => {
      const response = await db.query('delete from client where id = $1 returning id', [args.client_id]);
      return response.rows[0].id;
    },
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
    joined_date: String #included for request compatibility, but not used
  }

  type Query {
    getClientAppointmentCount(client_id: String!): Int!,
  }

  type Mutation {
    userAddClient(client: UserAddClientInput!): Client!,
    userEditClient(client: UserEditClientInput!): Client!,
    deleteClient(client_id: String!): String!,
  }
`;