import { gql } from '@apollo/client';

export const USER_ADD_CLIENT = gql`
  mutation UserAddClient($client: UserAddClientInput!) {
    userAddClient(client: $client) {
      ...BusinessClientFragment
    }
  }
`;

export const USER_EDIT_CLIENT = gql`
  mutation($client: UserEditClientInput!) {
    userEditClient(client: $client) {
      ...BusinessClientFragment
    }
  }
`;

export const GET_MULTI_CLIENT = gql`
  query($clientId: String!) {
    getMultiClientData(client_id: $clientId) {
      business_patch {
        id
        notes
        name
        email
        address
        phone
        joined_date
        avatar
        active
      }
      client {
        id
        name
        email
        address
        phone
        avatar
      }
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation($clientId: String!){
    deleteClient(client_id: $clientId)
  }
`;