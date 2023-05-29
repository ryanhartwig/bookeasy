import { gql } from '@apollo/client';

export const ADD_STAFF = gql`
  mutation($staff: StaffInput!) {
    addStaff(staff: $staff) {
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

export const EDIT_STAFF = gql`
  mutation($staff: StaffInput!) {
    editStaff(staff: $staff) {
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

export const DELETE_STAFF = gql`
  mutation($staffId: String!) {
    deleteStaff(staff_id: $staffId)
  }
`;

export const SET_STAFF_AVAILABILITY = gql`
  mutation($staffId: ID!, $businessId: ID!, $day: Int!, $slices: [AvailabilitySliceInput!]!) {
    setStaffAvailability(staff_id: $staffId, business_id: $businessId, day: $day, slices: $slices)
  }
`;

export const STAFF_FRAGMENT = gql`
  fragment StaffFragment on Staff {
    id
    date_added
    elevated
    registered_user_id
    name
    contact_email
    contact_phone
    avatar
  }
`;

export const GET_REGISTRATION_DETAILS = gql`
  query($pendingRegistrationId: String!) {
    getRegistrationDetails(pending_registration_id: $pendingRegistrationId) {
      error
      staff_id
      business_id
    }
  }
`;

export const DELETE_PENDING_REGISTRATION = gql`
  mutation($id: String!) {
    deletePendingRegistration(id: $id)
  }
`;