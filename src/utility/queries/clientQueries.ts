import { gql } from '@apollo/client';

export const USER_ADD_CLIENT = gql`
  mutation UserAddClient($client: UserAddClientInput) {
    userAddClient(client: $client) {
      ...BusinessClientFragment
    }
  }
`