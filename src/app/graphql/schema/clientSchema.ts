import db from "@/utility/db";
import { GraphQLError } from "graphql";
import uuid from "react-uuid";

export const clientResolvers = {
  Query: {
    getClientAppointmentCount: async (_: any, args: any) => {
      const response = await db.query('select count(*) from appointment where client_id = $1', [args.client_id]);
      return response.rows[0].count;
    },
  },
  Mutation: {
    userAddClient: async (_: any, args: any) => {
      const { business_id, notes, name, email, address, phone } = args.client;
      if (!business_id || !name) throw new GraphQLError('Missing required arguments');

      const response = await db.query(`
      insert into client (id, business_id, notes, name, email, address, phone, joined_date, active)
      values (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) returning *`, [uuid(), business_id, notes, name, email, address, phone, new Date().toISOString(), true]);
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
        select coalesce(c.email, rc.email) as email, c.id, c.address, c.phone, c.joined_date, c.active, c.notes, c.name, c.registered_client_id, rc.avatar
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
  input ClientInput {
    id: String!,
    business_id: String,
    name: String,
    email: String,
    address: String,
    phone: String,
    notes: String,
    active: Boolean,
  }

  type Query {
    getClientAppointmentCount(client_id: String!): Int!,
  }

  type Mutation {
    userAddClient(client: ClientInput!): Client!,
    userEditClient(client: ClientInput!): Client!,
    deleteClient(client_id: String!): String!,
  }
`;