import { gql } from '@apollo/client';

export const GET_BOOKING_SITE = gql`
  query($url: String, $id: String) {
    getBookingSite(url: $url, id: $id) {
      id
      business_id
      url
      is_own
    }
  }
`;

export const CREATE_BOOKING_SITE = gql`
  mutation($businessId: String!, $isOwn: Boolean!) {
    createBookingSite(business_id: $businessId, is_own: $isOwn) {
      business_id
      id
      url
      is_own
    }
  }
`;

export const DELETE_BOOKING_SITE = gql`
  mutation($id: String!) {
    deleteBookingSite(id: $id)
  }
`;