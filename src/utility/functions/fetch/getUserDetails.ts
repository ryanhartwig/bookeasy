import { getClient } from "../getClient";

import { gql } from '@apollo/client';
import { User } from "@/types/User";

export const query = gql`
  query getUser($id:ID!) {
    user(by:{id: $id}) {
      name
      email
      phone
      avatar
      createdAt
      prefs {
        privatePhoto
        privateEmail
        privatePhone
        notificationBooking
        notificationReminder
        notificationOverview
        notificationOverviewTime
      }
      id
    }
  }
`

const parseToUser = (d: any): User => ({
  businessIds: [],
  created: d.createdAt,
  email: d.email,
  id: d.id,
  name: d.name,
  avatar: d.avatar,
  phone: d.phone,
  ownBusinessId: d.ownBusiness.id,
});

/** Fetches user details for provided userId
 * 
 * @param userId Id of the user to fetch 
 */
export const getUser = async (userId: string) => {
  const client = getClient();

  let error: any = null;
  let user: User | null = null;
  
  try {
    const { data } = await client.query({ query, variables: {
      id: userId
    } });

    console.log(data.user);
    
    user = parseToUser(data.user)

    // console.log(user);

  } catch(e) {
    error = e;
  }

  return {
    data: user,
    error: null,
  }
}