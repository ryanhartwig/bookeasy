import { User } from "@/types/User";
import { gql } from "@apollo/client";
import { getClient } from "../../getClient";

export const query = gql`
  query BusinessMembers($after:String!, $id: ID!) {
    business(by: {id: $id}) {
      users(first: 100, after:$after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            name
            email
            phone
            avatar
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
const parseToUser = (data: any): User => {
  return {
    email: data.email,
    id: data.id,
    name: data.name,
    avatar: data.avatar,
    phone: data.phone,
  } as User;
}

/** Fetches all existing members in grafbase for the specified business
 * 
 * @param businessId Id of the business to fetch members from
 */
export const getBusinessMembers = async (businessId: string) => {
  let after = '';
  let error: any = undefined;
  const allMembers: User[] = []; 
  const client = getClient();
  
  const fillMembers = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        after,
        id: businessId
      } });
      const { users } = data.business;

      allMembers.push(...users.edges.map((edge: any) => parseToUser(edge.node)))
      if (users.pageInfo.hasNextPage) {
        after = users.pageInfo.endCursor;
        await fillMembers();
      }
      
    } catch(e) {
      error = e;
    }
    
  }

  await fillMembers();

  return { 
    data: allMembers,
    error
  }
}