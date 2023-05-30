import { gql } from '@apollo/client';

export const BUSINESS_FRAGMENT = gql`
  fragment BusinessFragment on Business {
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
`;

