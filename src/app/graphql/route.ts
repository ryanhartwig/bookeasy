import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';


// const resolvers = {
//   Query: {
//     hello: () => 'world',
//   },
// };

// const typeDefs = `#graphql
//   type Query {
//     hello: String
//   }
// `;

const schema = makeExecutableSchema({ typeDefs, resolvers });


const server = new ApolloServer({
  schema,
  introspection: true,
  
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, { context: async req => ({ req })});

export async function GET(request: NextRequest) {
  console.log('hi');
  
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}