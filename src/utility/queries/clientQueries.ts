import { gql } from '@apollo/client';

export const USER_ADD_CLIENT = gql`
  mutation UserAddClient($client: ClientInput!) {
    userAddClient(client: $client) {
      ...BusinessClientFragment
    }
  }
`;

export const USER_EDIT_CLIENT = gql`
  mutation($client: ClientInput!) {
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

export const GET_BOOKING_SITE_CLIENT_ID = gql`
  query($registeredUserId: String!, $businessId: String!) {
    getBookingSiteClientId(registered_user_id: $registeredUserId, business_id: $businessId) 
  }
`;