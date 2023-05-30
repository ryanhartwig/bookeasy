import db from "@/utility/db";
import uuid from "react-uuid";

export const bookingSiteResolvers = {
  Mutation: {
    createBookingSite: async (_: any, args: any) => {
      const { business_id } = args;
      const id = uuid();
      
      const response = await db.query(`
        insert into boking_site (id, url, business_id) 
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

  type Mutation {
    createBookingSite(business_id: String!): BookingSite!,
  }
`;