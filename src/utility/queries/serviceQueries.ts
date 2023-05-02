import { gql } from '@apollo/client';


export const ADD_SERVICE = gql`
  mutation($service: ServiceInput) {
    addService(service: $service) 
  }
`;

export const EDIT_SERVICE = gql`
  mutation($service: ServiceInput) {
    editService(service: $service)
  }
`;