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
      ownBusiness {
        id
      }
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

export const parseToUser = (d: any): User => ({
  id: d.id,
  ownBusinessId: d.ownBusiness.id,
  name: d.name,
  email: d.email,
  phone: d.phone ?? null,
  businessIds: [],
  avatar: d.avatar ?? '',
  created: d.createdAt,
  prefs: {
    privatePhoto: d.prefs.privatePhoto,
    privateEmail: d.prefs.privateEmail,
    privatePhone: d.prefs.privatePhone,
    notificationBooking: d.prefs.notificationBooking,
    notificationReminder: d.prefs.notificationReminder,
    notificationOverview: d.prefs.notificationOverview,
    notificationOverviewTime: d.prefs.notificationOverviewTime,
  }
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

    user = parseToUser(data.user); 
  } catch(e) {
    error = e;
  }

  return {
    data: user,
    error: null,
  }
}