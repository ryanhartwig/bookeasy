import { Appointment } from "@/types/Appointment";

import { gql } from "@apollo/client";
import { getClient } from "../getClient";

const query = gql`
  query UserAppointmentsQuery($after: String!, $id: ID!) {
  user(by: {id: $id}) {
    appointments(first:100, after: $after) {
      edges {
        node {
          id
          business { id }
          client { id }
          service { id }
          startDate
          endDate
          serviceName
          serviceDuration
          serviceProvider
          serviceCost
          isVideo
          isPaid
        }
      }
      pageInfo {
        hasNextPage 
        endCursor
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
const parseToAppointment = (data: any, userId: string): Appointment => {
  return {
    businessId: data.business.id,
    clientId: data.client.id,
    serviceId: data.service.id,
    id: data.id,
    startDate: Number(data.startDate),
    endDate: Number(data.endDate),
    serviceName: data.serviceName,
    serviceDuration: data.serviceDuration,
    serviceProvider: data.serviceProvider,
    serviceCost: data.serviceCost,
    isVideo: data.isVideo,
    isPaid: data.isPaid,
    userId,
  } as Appointment;
}

/** Fetches all existing appointments in grafbase for the specified user
 * 
 * @param userId Id of the user to fetch appointments from
 */
export const getAllAppointments = async (userId: string) => {
  let after = '';
  let error: any = undefined;
  const allAppointments: Appointment[] = []; 
  const client = getClient();
  
  const fillAppointments = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        after,
        id: userId
      } });
      const { appointments } = data.user;

      allAppointments.push(...appointments.edges.map((edge: any) => parseToAppointment(edge.node, userId)))
      if (appointments.pageInfo.hasNextPage) {
        after = appointments.pageInfo.endCursor;
        await fillAppointments();
      }
      
    } catch(e) {
      error = e;
    }
    
  }

  await fillAppointments();



  return { 
    appointments: allAppointments,
    error
  }
}