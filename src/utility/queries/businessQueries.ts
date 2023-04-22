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
    }
  }
`;

export const GET_BUSINESS_CLIENTS_FORM = gql`
  query($businessId: ID!) {
    getBusinessClients(business_id: $businessId) {
      name
      avatar
    }
  }
`;

export const GET_BUSINESS_SERVICES_FORM = gql`
  query($businessId: ID!) {
    getBusinessServices(business_id: $businessId) {
      name
      color
      is_video
    }
  }
`;