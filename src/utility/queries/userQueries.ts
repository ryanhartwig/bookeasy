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
      avatar
      is_own
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
      own_business_id
    }
  }
`;

export const GET_USER_WITH_PREFS = gql`
  query($userId: ID!) {
    getUser(id: $userId) {
      id
      name
      email
      phone
      created
      prefs {
        private_photo
        private_email
        private_phone
        notification_booking
        notification_reminder
        notification_overview
        notification_overview_time
      }
      avatar
      own_business_id
    }
  }
`;

export const SET_USER_AVAILABILITY = gql`
  mutation($userId: ID!, $businessId: ID!, $day: Int!, $slices: [AvailabilitySliceInput!]!) {
    setUserAvailability(user_id: $userId, business_id: $businessId, day: $day, slices: $slices)
  }
`;


export const PATCH_USER = gql`
  mutation($userId: ID!, $patch: UserPatch) {
    patchUser(user_id: $userId, patch: $patch) {
      id
    }
  } 
`;

export const PATCH_USER_PREFS = gql`
  mutation($userId: ID!, $patch: UserPrefsPatch) {
    patchUserPrefs(user_id: $userId, patch: $patch) {
      user_id
    }
  }
`;