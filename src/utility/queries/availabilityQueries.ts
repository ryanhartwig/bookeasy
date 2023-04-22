import { gql } from '@apollo/client';

export const GET_USER_AVAILABILITY = gql`
  query($userId: ID!) {
    getUserAvailability(user_id: $userId) {
      day
      start_time
      end_time
      business_id
    }
  }
`