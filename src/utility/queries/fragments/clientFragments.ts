import { gql } from '@apollo/client';

export const BUSINESS_CLIENT_FRAGMENT = gql`
  fragment BusinessClientFragment on BusinessClient {
    ...BusinessClientFragment
  }
`;

export const NEW_CLIENT_FRAGMENT = gql`
  fragment NewClient on BusinessClient {
    ...BusinessClientFragment
  }
`;
