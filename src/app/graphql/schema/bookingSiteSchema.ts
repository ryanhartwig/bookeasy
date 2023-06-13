import db from "@/utility/db";
import { generateRandomUUID } from "@/utility/functions/misc/generateRandomUUID";

export const bookingSiteResolvers = {
  Query: {
    getBookingSite: async (_: any, args: any) => {
      const response = await db.query('select * from booking_site where url = $1 or id = $2', [args.url, args.booking_site_id]);
      return response.rows[0];      
    },
  },
  Mutation: {
    createBookingSite: async (_: any, args: any) => {
      const { business_id } = args;
      const id = generateRandomUUID();
      
      const response = await db.query(`
        insert into booking_site (id, url, business_id) 
        values ($1, $2, $3) returning *
      `, [id, id, business_id]);

      await db.query('update business set booking_site_id = $1 where id = $2', [id, business_id]);

      return response.rows[0];
    },
  },
}

export const bookingSiteTypeDefs = `#graphql
  type BookingSite {
    id: String!,
    url: String!,
    business_id: String!,
  }

  type Query {
    getBookingSite(url: String, booking_site_id: String): BookingSite,
  }

  type Mutation {
    createBookingSite(business_id: String!): BookingSite!,
  }
`;