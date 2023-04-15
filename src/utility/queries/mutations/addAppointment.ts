import { gql } from "@apollo/client";
import { getClient } from "@/utility/functions/getClient";

export const appointmentCreate = gql`
  mutation CreateAppointment(
    $userId: ID!, 
    $businessId: ID!,
    $clientId: ID!,
    $serviceId: ID!,
    $startDate: String!,
    $endDate: String!,
    $serviceDuration: Int!,
    $serviceCost: Int!,
    $isVideo: Boolean!,
    $isPaid: Boolean!
  ) {
    appointmentCreate(input:{
      user:{link: $userId},
      business:{link: $businessId},
      client:{link: $clientId},
      service:{link: $serviceId},
      startDate: $startDate,
      endDate: $endDate,
      serviceDuration: $serviceDuration,
      serviceCost: $serviceCost,
      isVideo: $isVideo,
      isPaid: $isPaid,
    }) {
      appointment {
        id
      }
    }
  }
`;

const linkUser = gql`
  mutation LinkUserApp($userId:ID!, $appointmentId: ID!) {
    userUpdate(by: {id: $userId}, input: {
      appointments:{ link: $appointmentId }
    }) {
      user {
        id
      }
    }
  }
`;

const linkClient = gql`
  mutation LinkClientApp($clientId:ID!, $appointmentId: ID!) {
    clientUpdate(by: {id: $clientId}, input: {
      appointments:{ link: $appointmentId }
    }) {
      client {
        id
      }
    }
  }
`;

export interface AppointmentInput {
  userId: string,
  businessId: string,
  clientId: string,
  serviceId: string,
  startDate: string,
  endDate: string,
  serviceDuration: number,
  serviceCost: number,
  isVideo: boolean,
  isPaid: boolean,
};

export const addAppointment = async (appointment: AppointmentInput) => {
  const client = getClient();
  let error: any = undefined;
  let appointmentId: null | string = null;
  let lastSuccessfulOperation = 'none';
  
  try {
    const { data } = await client.query({ query: appointmentCreate, variables: {
      ...appointment,
      id: undefined
    } });

    lastSuccessfulOperation = 'create appointment';

    appointmentId = data.appointment.id;

    await client.query({ query: linkUser, variables: {
      userId: appointment.userId,
      appointmentId,
    }});

    lastSuccessfulOperation = 'link user';
    
    await client.query({ query: linkClient, variables: {
      clientId: appointment.clientId,
      appointmentId,
    }});

    lastSuccessfulOperation = 'link client';
  } catch(e) {
    error = e;
  }

  return {
    error,
    data: appointmentId,
    lastSuccessfulOperation,
  }
}