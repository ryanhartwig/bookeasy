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
      user_id
      avatar
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

export const GET_BUSINESS_USERS = gql`
  query($businessId: ID!) {
    getBusiness(business_id: $businessId) {
      users {
        user {
          id
          name
          avatar
        }
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

export const UPDATE_BUSINESS_NAME = gql`
  mutation($businessId: ID!, $name: String!) {
    updateBusinessName(business_id: $businessId, name: $name)
  }
`;

export const UPDATE_BUSINESS_EMAIL = gql`
  mutation($businessId: ID!, $email: String!) {
    updateBusinessEmail(business_id: $businessId, email: $email)
  }
`;

export const UPDATE_BUSINESS_PHONE = gql`
  mutation($businessId: ID!, $phone: String!) {
    updateBusinessPhone(business_id: $businessId, phone: $phone)
  }
`;

export const UPDATE_BUSINESS_AVATAR = gql`
  mutation($businessId: ID!, $avatar: String!) {
    updateBusinessAvatar(business_id: $businessId, avatar: $avatar)
  }
`;