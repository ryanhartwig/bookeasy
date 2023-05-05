import { gql } from '@apollo/client';

export const GET_USER_AVAILABILITY = gql`
  query($userId: ID!, $businessId: ID) {
    getUserAvailability(user_id: $userId, business_id: $businessId) {
      day
      start_time
      end_time
      business_id
    }
  }
`