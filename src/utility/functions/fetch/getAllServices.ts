import { Service } from "@/types/Service"
import { getClient } from "../getClient";

import { gql } from '@apollo/client';

export const query = gql`
  query UserServicesQuery($after: String!,  $id: ID!) {
  user(by: {id: $id}) {
    services(first:100, after: $after) {
      edges {
        node {
          id 
          business { id }
          name
          duration
          provider
          cost
          isVideo
          color
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`

/** Converts JSON data received from grafbase into typed Service object
 * 
 * @param data JSON data
 * @param userId Id of current user
 */
export const parseToService = (data: any): Service => {
  return {
    id: data.id,
    businessId: data.business.id,
    name: data.name,
    duration: data.duration,
    provider: data.provider,
    cost: data.cost,
    isVideo: data.isVideo,
    color: data.color,
    userIds: [],
  }
}

/** Fetches all existing services in grafbase for the specified user
 * 
 * @param userId Id of the user to fetch appointments from
 */
export const getAllServices = async (userId: string) => {
  let after = '';
  let error: any = undefined;
  const allServices: Service[] = [];
  const client = getClient();
  
  const fillServices = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        after,
        id: userId
      } });
      const { services } = data.user;

      allServices.push(...services.edges.map((edge: any) => parseToService(edge.node)))
      if (services.pageInfo.hasNextPage) {
        after = services.pageInfo.endCursor;
        await fillServices();
      }
    } catch(e) {
      console.log(e);
      error = e;
    }
  }

  await fillServices();

  return {
    data: allServices,
    error,
  }
}