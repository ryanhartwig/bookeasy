import { gql } from '@apollo/client';

export const BUSINESS_CLIENT_FRAGMENT = gql`
  fragment BusinessClientFragment on Client {
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

export const NEW_CLIENT_FRAGMENT = gql`
  fragment NewClient on Client {
    ...BusinessClientFragment
  }
`;
