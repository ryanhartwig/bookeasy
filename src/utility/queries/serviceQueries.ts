import { gql } from '@apollo/client';


export const ADD_SERVICE = gql`
  mutation($service: ServiceInput) {
    addService(service: $service) 
  }
`;