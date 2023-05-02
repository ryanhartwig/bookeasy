import { gql } from '@apollo/client';

export const SERVICE_FRAGMENT = gql`
  fragment ServiceFragment on Service {
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
`;