import { gql } from '@apollo/client';

export const GET_USER_BUSINESSES = gql`
  query($userId: ID!) {
    getUserBusinesses(user_id: $userId) {
      ...BusinessFragment
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
      business_id
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
      business_id
    }
  }
`;

export const PATCH_USER = gql`
  mutation($userId: ID!, $patch: UserPatch!) {
    patchUser(user_id: $userId, patch: $patch) {
      id
    }
  } 
`;

export const PATCH_USER_PREFS = gql`
  mutation($userId: ID!, $patch: UserPrefsPatch!) {
    patchUserPrefs(user_id: $userId, patch: $patch) {
      registered_user_id
    }
  }
`;

export const REGISTER_USER_WITH_CREDENTIALS = gql`
  mutation($credentials: CredentialsInput!) {
    registerUserWithCredentials(credentials: $credentials) {
      id
    }
  }
`;