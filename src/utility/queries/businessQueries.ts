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
      id
      name
      duration
      provider
      cost
      is_video
      color
      deleted
      business_id
      assigned_users {
        id
        name
        avatar
      }
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