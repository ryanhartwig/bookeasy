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
      user_id
      avatar
    }
  }
`;

export const GET_USER = gql`
  query($userId: ID!) {
    getUser(id: $userId) {
      id
      name
      email
      phone
      created
      avatar
    }
  }
`;

export const GET_USER_OWN_BUSINESS = gql`
  query($userId: ID!) {
    getUserOwnBusiness(user_id: $userId) {
      id
      name
      email
      phone
      min_booking_notice
      min_cancel_notice
      max_book_ahead
      user_id
      avatar
    }
  }
`;

export const SET_USER_AVAILABILITY = gql`
  mutation($userId: ID!, $businessId: ID!, $day: Int!, $slices: [AvailabilitySliceInput!]!) {
    setUserAvailability(user_id: $userId, business_id: $businessId, day: $day, slices: $slices)
  }
`;