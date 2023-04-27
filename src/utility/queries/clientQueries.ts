import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation UserAddClient($client: UserAddClientInput) {
    userAddClient(client: $client) {
      ...BusinessClientFragment
    }
  }
`