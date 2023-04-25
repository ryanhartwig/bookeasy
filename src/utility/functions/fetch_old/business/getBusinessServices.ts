import { Service } from "@/types/Service";
import { gql } from "@apollo/client";
import { getClient } from "../../getClient";

export const query = gql`
  query BusinessServices($after: String!, $id: ID!) {
    business(by: { id: $id }) {
      services(first: 100, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            name
            duration
            provider
            cost
            isVideo
            color
            assignedUsers(first: 100) {
              edges {
                node {
                  id
                }
              }
            }
            id
            createdAt
          }
        }
      }
    }
  }
`;

/** Converts JSON data received from grafbase into typed User object
 * 
 * @param data JSON data
 */
const parseToService = (data: any, businessId: string): Service => {
  return {
    id: data.id,
    businessId,
    name: data.name,
    duration: data.duration,
    provider: data.provider,
    cost: data.cost,
    isVideo: data.isVideo,
    color: data.color,
    userIds: data.assignedUsers.edges.map((edge: any) => edge.node.id),
  } as Service;
}

/** Fetches all existing Services in grafbase for the specified business
 * 
 * @param businessId Id of the business to fetch Services from
 */
export const getBusinessServices = async (businessId: string) => {
  let after = '';
  let error: any = undefined;
  const allServices: Service[] = []; 
  const client = getClient();
  
  const fillServices = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        after,
        id: businessId
      } });
      const { services } = data.business;

      allServices.push(...services.edges.map((edge: any) => parseToService(edge.node, businessId)))
      if (services.pageInfo.hasNextPage) {
        after = services.pageInfo.endCursor;
        await fillServices();
      }
      
    } catch(e) {
      error = e;
    }
    
  }

  await fillServices();

  return { 
    data: allServices,
    error
  }
}