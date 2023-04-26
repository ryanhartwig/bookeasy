import { gql } from '@apollo/client';

export const GET_USER_APPOINTMENTS = gql`
  query($userId: ID!, $rangeStart: String, $rangeEnd: String) {
    getUserAppointments(user_id: $userId, range_start: $rangeStart, range_end: $rangeEnd) {
      ...AppointmentDataFragment
    }
  }
`;

export const GET_CLIENT_APPOINTMENTS = gql`
  query($clientId: ID!) {
    getClientAppointments(client_id: $clientId) {
      ...AppointmentDataFragment
    }
  }
`;

export const ADD_EDIT_APPOINTMENT = gql`
  mutation($appointment: AppointmentInput!, $edit: Boolean) {
    addEditAppointment(appointment: $appointment, edit: $edit) {
      ...AppointmentDataFragment
    } 
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation($appointmentId: String!) {
    deleteAppointment(id: $appointmentId)
  }
`;