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
`;

export const GET_STAFF_AVAILABILITY = gql`
  query($staffId: ID!) {
    getStaffAvailability(staff_id: $staffId) {
      day
      start_time
      end_time
      business_id
    }
  }
`;