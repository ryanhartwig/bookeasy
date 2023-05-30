import { gql } from '@apollo/client';

export const GET_USER_BUSINESSES_FRAGMENT = gql`
  fragment GetUserBusinessesFragment on Business {
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