export const resolvers = {
  Query: {
    hello: () => 'world',
    user: () => ({
      id: 'test',
      name: "testy test"
    }),
  },
};