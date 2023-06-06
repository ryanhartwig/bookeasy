import { gql } from '@apollo/client';

export const GET_BOOKING_SITE = gql`
  query($url: String!) {
    getBookingSite(url: $url) {
      id
      business_id
      url
    }
  }
`;