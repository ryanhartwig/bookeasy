import { gql } from '@apollo/client';

export const GET_BOOKING_SITE = gql`
  query($url: String, $bookingSiteId: String) {
    getBookingSite(url: $url, booking_site_id: $bookingSiteId) {
      id
      business_id
      url
    }
  }
`;

export const CREATE_BOOKING_SITE = gql`
  mutation($businessId: String!) {
    createBookingSite(business_id: $businessId, is_own: $isOwn) {
      business_id
      id
      url
      is_own
    }
  }
`;