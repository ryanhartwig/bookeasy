import { Client } from "@/types/Client";

import { gql } from "@apollo/client";
import { getClient } from "../getClient";

export const query = gql`
  query ClientsQuery($after:String!, $id: ID!) {
    user(by: {id: $id}) {
      assignedClients(first: 100, after:$after) {
        edges {
          node {
            id
            business { id }
            name
            email
            notes
            address
            phone
            active
            avatar
          }
        }
      }
    }
  }
`;

/** Converts JSON data received from grafbase into typed Appointment object
 * 
 * @param data JSON data
 * @param userId Id of current user
 */
const parseToClient = (data: any, userId: string): Client => {
  return {
    id: data.id,
    businessId: data.business.id,
    name: data.name,
    email: data.email,
    notes: data.notes ?? undefined,
    avatar: data.avatar,
    address: data.address ?? undefined,
    phone: data.phone ?? undefined,
    created: data.created,
    active: data.active,
    assignedUserIds: [],
  } as Client;
}

/** Fetches all existing appointments in grafbase for the specified user
 * 
 * @param userId Id of the user to fetch appointments from
 */
export const getAllClients = async (userId: string) => {
  let after = '';
  let error: any = undefined;
  const allClients: Client[] = []; 
  const client = getClient();
  
  const fillClients = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        after,
        id: userId
      } });
      const { assignedClients } = data.user;

      allClients.push(...assignedClients.edges.map((edge: any) => parseToClient(edge.node, userId)))
      if (assignedClients.pageInfo.hasNextPage) {
        after = assignedClients.pageInfo.endCursor;
        await fillClients();
      }
      
    } catch(e) {
      error = e;
    }
    
  }

  await fillClients();

  return { 
    data: allClients,
    error
  }
}