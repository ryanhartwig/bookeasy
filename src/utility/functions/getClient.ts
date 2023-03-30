import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.GRAFBASE_API_URL,
        headers: {
          'x-api-key': process.env.GRAFBASE_API_KEY || ''
        },
      }),
      cache: new InMemoryCache(),
    });
  }

  return client;
};

/* 

To revalidate by interval (seconds):

const { data } = await client.query({
  query,
  context: {
    fetchOptions: {
      next: { revalidate: 5 }
    }
  }
});

|| 

export const revalidate = 5;

*/