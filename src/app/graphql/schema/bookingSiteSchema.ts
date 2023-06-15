import db from "@/utility/db";
import { generateRandomUUID } from "@/utility/functions/misc/generateRandomUUID";
import uuid from "react-uuid";

export const bookingSiteResolvers = {
  Query: {
    getBookingSite: async (_: any, args: any) => {
      const response = await db.query('select * from booking_site where url = $1 or id = $2', [args.url, args.id]);
      return response.rows[0];      
    },
  },
  Mutation: {
    createBookingSite: async (_: any, args: any) => {
      const { business_id, is_own } = args;
      const id = uuid();
      
      const response = await db.query(`
        insert into booking_site (id, url, business_id, is_own) 
        values ($1, $2, $3, $4) returning *
      `, [id, generateRandomUUID(8), business_id, is_own]);

      await db.query('update business set booking_site_id = $1 where id = $2', [id, business_id]);

      return response.rows[0];
    },
    deleteBookingSite: async (_: any, args: any) => {
      const { id } = args;
      const response = await db.query('delete from booking_site where id = $1 returning *', [id]);
      await db.query('update business set booking_site_id = null where id = $1', [response.rows[0].business_id]);
      return response.rows[0].id; 
    },
  },
}

export const bookingSiteTypeDefs = `#graphql
  type BookingSite {
    id: String!,
    url: String!,
    business_id: String!,
    is_own: Boolean!,
  }

  type Query {
    getBookingSite(url: String, id: String): BookingSite,
  }

  type Mutation {
    createBookingSite(business_id: String!, is_own: Boolean!): BookingSite!,
    deleteBookingSite(id: String!): String!,
  }
`;