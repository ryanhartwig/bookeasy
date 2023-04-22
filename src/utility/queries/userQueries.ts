import { gql } from '@apollo/client';

export const GET_USER_BUSINESSES = gql`
  query($userId: ID!) {
    getUserBusinesses(user_id: $userId) {
      id
      name
      email
      phone
      min_booking_notice
      min_cancel_notice
      max_book_ahead
    }
  }
`;

export const GET_USER = gql`
  query($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      own_business {
        id
      }
      name
      email
      phone
      created
    }
  }
`