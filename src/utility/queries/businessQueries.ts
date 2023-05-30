import { gql } from '@apollo/client';

export const GET_BUSINESS = gql`
  query($businessId: ID!) {
    getBusiness(business_id: $businessId) {
      id
      name
      email
      phone
      min_booking_notice
      min_cancel_notice
      max_book_ahead
      avatar
      created
    }
  }
`;

export const GET_BUSINESS_WITH_STAFF_ID = gql`
  query($businessId: ID!) {
    getBusiness(business_id: $businessId) {
      id
      name
      email
      phone
      min_booking_notice
      min_cancel_notice
      max_book_ahead
      avatar
      created
      staff {
        id
      }
    }
  }
`;

export const GET_BUSINESS_CLIENTS = gql`
  query($businessId: ID!) {
    getBusinessClients(business_id: $businessId) {
      ...BusinessClientFragment
    }
  }
`;

export const GET_BUSINESS_CLIENTS_FORM = gql`
  query($businessId: ID!) {
    getBusinessClients(business_id: $businessId) {
      id
      name
      avatar
    }
  }
`;

export const GET_BUSINESS_SERVICES_FORM = gql`
  query($businessId: ID!) {
    getBusinessServices(business_id: $businessId) {
      id
      name
      color
      is_video
      cost
      duration
      deleted
    }
  }
`;

export const GET_BUSINESS_SERVICES = gql`
  query($businessId: ID!) {
    getBusinessServices(business_id: $businessId) {
      ...ServiceFragment
    }
  }
`;

export const GET_BUSINESS_STAFF = gql`
  query($businessId: ID!) {
    getBusiness(business_id: $businessId) {
      staff {
        date_added
        elevated
        id
        registered_user_id
        name
        contact_email
        contact_phone
        avatar
        deleted
        pending_registration_id
      }
    }
  }
`;

export const GET_BUSINESS_FORM_STAFF = gql`
  query($businessId: ID!) {
    getBusiness(business_id: $businessId) {
      staff {
        id
        registered_user_id
        name
        avatar
      }
    }
  }
`;

export const GET_BUSINESS_APPOINTMENT_METRICS = gql`
  query($businessId: ID!, $startDate: String, $endDate: String, ) {
    getBusinessAppointmentMetrics(business_id: $businessId, start_date: $startDate, end_date: $endDate) {
      is_paid
      service_cost
    }
  }
`;

export const UPDATE_BUSINESS_PREFS = gql`
  mutation($businessId: ID!, $patch: BusinessPrefsInput) {
    updateBusinessPrefs(business_id: $businessId, patch: $patch) {
      id
      name
      email
      phone
      min_booking_notice
      min_cancel_notice
      max_book_ahead
      avatar
      created
    }
  }
`;

export const NEW_BUSINESS = gql`
  mutation($name: String!, $userId: String!) {
    newBusiness(name: $name, user_id: $userId) {
      id
      name
      email
      phone
      min_booking_notice
      min_cancel_notice
      max_book_ahead
      avatar
      created
    }
  }
`;

export const REMOVE_BUSINESS = gql`
  mutation($businessId: String!) {
    removeBusiness(business_id: $businessId)
  }
`;