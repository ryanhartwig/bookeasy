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

export const DELETE_SERVICE = gql`
  mutation($serviceId: String!) {
    deleteService(service_id: $serviceId)
  }
`;