import { gql } from "@apollo/client";
import { getClient } from "../../getClient";

export const query = gql`
  query BusinessUserMeta($after: String!, $id: ID!) {
    business(by: { id: $id }) {
      userMeta(first: 100, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            user { id }
            elevated
            dateAdded
          }
        }
      }
    }
  }
`;

export interface UserMeta {
  dateAdded: string,
  elevated: string,
  userId: string,
}

/** Converts JSON data received from grafbase into typed UserMeta object
 * 
 * @param data JSON data
 */
const parseToUserMeta = (data: any): UserMeta => {
  return {
    dateAdded: data.dateAdded,
    userId: data.user.id,
    elevated: data.elevated
  } as UserMeta;
}

/** Fetches all existing UserMeta in grafbase for the specified business
 * 
 * @param businessId Id of the business to fetch UserMeta from
 */
export const getBusinessUserMeta = async (businessId: string) => {
  let after = '';
  let error: any = undefined;
  const allUserMeta: UserMeta[] = []; 
  const client = getClient();
  
  const fillUserMeta = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        after,
        id: businessId
      } });
      const { userMeta } = data.business;

      allUserMeta.push(...userMeta.edges.map((edge: any) => parseToUserMeta(edge.node)))
      if (userMeta.pageInfo.hasNextPage) {
        after = userMeta.pageInfo.endCursor;
        await fillUserMeta();
      }
      
    } catch(e) {
      error = e;
    }
    
  }

  await fillUserMeta();

  return { 
    data: allUserMeta,
    error
  }
}