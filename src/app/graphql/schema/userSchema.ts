import db from "@/app/db";

export const userResolvers = {
  Query: {
    testQuery: async () => {
      const response = await db.query('select * from users');
  
      if (response.rowCount) {
        return response.rows[0].name as string;
      } else {
        return 'try again :('
      }
    },
    testUser: () => 'teset user',
  }
}

export const userTypeDefs = `#graphql
  type Query {
    testQuery: String!,
    testUser: String!
  }
`;