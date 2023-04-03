import { getClient } from "../getClient";

import { gql } from '@apollo/client';

export const query = gql`
  query GetServiceUsers($id: ID!) {
    service(by: {id: $id}){
      assignedUsers(first: 100){
        edges {
          node {
            id
            name
            avatar
          }
        }
      }
    }
  }
`

/**
 * User return fields from grafbase
 */
interface ServiceUser {
  id: string,
  name: string,
  avatar: string,
}

/** Fetches all assigned users in grafbase for the specified service
 * 
 * @param serviceId Id of the service to fetch users from
 */
export const getServiceUsers = async (serviceId: string) => {
  let error: any = undefined;
  const assignedUsers: ServiceUser[] = [];
  const client = getClient();
  
  const fillUsers = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        id: serviceId
      } });
      const { assignedUsers } = data.service;

      assignedUsers.push(...assignedUsers.edges.map((edge: any) => ({id: edge.id, name: edge.name, avatar: edge.avatar} as ServiceUser)))
    } catch(e) {
      error = e;
    }
  }

  await fillUsers();

  return {
    data: assignedUsers,
    error,
  }
}