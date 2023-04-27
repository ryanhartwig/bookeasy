import { gql } from '@apollo/client';

export const BUSINESS_CLIENT_FRAGMENT = gql`
  fragment BusinessClientFragment on BusinessClient {
    id
    notes
    name
    email
    address
    phone
    joined_date
    avatar
    active
  }
`;
