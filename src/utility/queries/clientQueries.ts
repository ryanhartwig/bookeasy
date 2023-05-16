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

export const DELETE_CLIENT = gql`
  mutation($clientId: String!){
    deleteClient(client_id: $clientId)
  }
`;

export const GET_CLIENT_APPOINTMENT_COUNT = gql`
  query($clientId: String!) {
    getClientAppointmentCount(client_id: $clientId)
  }
`;