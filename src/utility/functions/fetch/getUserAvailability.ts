import { BaseAvailability } from "@/types/BaseAvailability";
import { gql } from "@apollo/client";
import { getClient } from "../getClient";

export const query = gql`
  query getUserAvailability($id: ID!, $after: String) {
    user(by: { id: $id }) {
      availability(first: 100, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            business {
              id
            }
            slices {
              day
              start
              end
            }
            timeOff {
              startPeriod
              endPeriod
              reason
            }
          }
        }
      }
    }
  }
`;

/** Converts JSON data received from grafbase into typed base availability object
 * 
 * @param data JSON data
 * @param userId Id of user
 */
export const parseToAvailability = (data: any, userId: string): BaseAvailability => {
  return {
    businessId: data.business.id,
    id: data.id,
    recurring: [],
    slices: data.slices,
    timeOff: data.timeOff,
    userId: userId
  } as BaseAvailability;
}

/** Fetches all existing businesses in grafbase for the specified user
 * 
 * @param userId Id of the user to fetch businesses from
 */
export const getUserAvailability = async (userId: string) => {
  let after = '';
  let error: any = undefined;
  const allBaseAvailability: BaseAvailability[] = []; 
  const client = getClient();
  
  const fillAvailability = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        after,
        id: userId
      } });
      const { availability } = data.user;

      allBaseAvailability.push(...availability.edges.map((edge: any) => parseToAvailability(edge.node, userId)))
      if (availability.pageInfo.hasNextPage) {
        after = availability.pageInfo.endCursor;
        await fillAvailability();
      }
      
    } catch(e) {
      error = e;
    }
    
  }

  await fillAvailability();

  return { 
    data: allBaseAvailability,
    error
  }
}