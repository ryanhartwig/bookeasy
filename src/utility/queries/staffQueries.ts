import { gql } from '@apollo/client';

export const ADD_STAFF = gql`
  mutation($name: String!, $businessId: String!, $phone: String, $email: String) {
    addStaff(name: $name, business_id: $businessId, contact_phone: $phone, contact_email: $email) {
      id
      date_added
      elevated
      registered_user_id
      name
      contact_email
      contact_phone
      avatar
    }
  }
`;

export const SET_STAFF_AVAILABILITY = gql`
  mutation($staffId: ID!, $businessId: ID!, $day: Int!, $slices: [AvailabilitySliceInput!]!) {
    setStaffAvailability(staff_id: $staffId, business_id: $businessId, day: $day, slices: $slices)
  }
`;