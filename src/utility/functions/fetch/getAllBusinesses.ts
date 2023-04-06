import { Business } from "@/types/Business";

import { gql } from "@apollo/client";
import { getClient } from "../getClient";

export const query = gql`
  query UserBusinessesQuery($after:String!, $id:ID!) {
    user(by: {id:$id}) {
      businesses(first: 100, after:$after) {
        edges {
          node {
            id
            name
            email
            phone
            prefs {
              minBookingNotice
              minCancelNotice
              maxBookAhead
            }
          }
        }
      }
    }
  }
`;

/** Converts JSON data received from grafbase into typed Business object
 * 
 * @param data JSON data
 * @param userId Id of current user
 */
export const parseToBusiness = (data: any): Business => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    photo: data.photo ?? null,
    prefs: {
      min_booking_notice: data.min_booking_notice ?? null,
      min_cancel_notice: data.min_cancel_notice ?? null,
      max_book_ahead: data.max_book_ahead ?? null,
    }
  } as Business;
}

/** Fetches all existing businesses in grafbase for the specified user
 * 
 * @param userId Id of the user to fetch businesses from
 */
export const getAllBusinesses = async (userId: string) => {
  let after = '';
  let error: any = undefined;
  const allBusinesses: Business[] = []; 
  const client = getClient();
  
  const fillBusinesses = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        after,
        id: userId
      } });
      const { businesses } = data.user;

      allBusinesses.push(...businesses.edges.map((edge: any) => parseToBusiness(edge.node)))
      if (businesses.pageInfo.hasNextPage) {
        after = businesses.pageInfo.endCursor;
        await fillBusinesses();
      }
      
    } catch(e) {
      error = e;
    }
    
  }

  await fillBusinesses();

  return { 
    data: allBusinesses,
    error
  }
}