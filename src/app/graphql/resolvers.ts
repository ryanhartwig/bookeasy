import db from '../db';

export const resolvers = {
  Query: {
    hello: () => 'world',
    testQuery: async () => {
      const response = await db.query('select * from users');

      if (response.rowCount) {
        return response.rows[0].name as string;
      } else {
        return 'try again :('
      }
    }
  },
};