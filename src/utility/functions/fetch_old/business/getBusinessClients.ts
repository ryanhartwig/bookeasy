import { Client } from "@/types/Client";
import { gql } from "@apollo/client";
import { getClient } from "../../getClient";

export const query = gql`
  query BusinessClients($after:String!, $id: ID!) {
    business(by: {id: $id}) {
      clients(first: 100, after:$after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            name
            email
            notes
            avatar
            address
            phone
            createdAt
            active
            assignedUsers(first: 100){edges{node{id}}}
          }
        }
      }
    }
  }
`;

/** Converts JSON data received from grafbase into typed Client object
 * 
 * @param data JSON data
 */
const parseToClient = (data: any, businessId: string): Client => {
  return {
    id: data.id,
    businessId: businessId,
    name: data.name,
    email: data.email,
    notes: data.notes,
    avatar: data.avatar,
    address: data.address,
    phone: data.phone,
    created: data.createdAt,
    active: data.active,
    assignedUserIds: data.assignedUsers.edges.map((edge:any) => edge.node.id),
  } as Client;
}

/** Fetches all existing clients in grafbase for the specified business
 * 
 * @param businessId Id of the business to fetch clients from
 */
export const getBusinessClients = async (businessId: string) => {
  let after = '';
  let error: any = undefined;
  const allClients: Client[] = []; 
  const client = getClient();
  
  const fillClients = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        after,
        id: businessId
      } });
      const { clients } = data.business;

      allClients.push(...clients.edges.map((edge: any) => parseToClient(edge.node, businessId)))
      if (clients.pageInfo.hasNextPage) {
        after = clients.pageInfo.endCursor;
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