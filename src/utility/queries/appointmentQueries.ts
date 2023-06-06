import { gql } from '@apollo/client';

export const GET_USER_APPOINTMENTS = gql`
  query($userId: ID!, $rangeStart: String, $rangeEnd: String) {
    getUserAppointments(registered_user_id: $userId, range_start: $rangeStart, range_end: $rangeEnd) {
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

export const GET_STAFF_APPOINTMENTS_DATES = gql`
  query($staffId: ID!, $rangeStart: String, $rangeEnd: String) {
    getStaffAppointments(staff_id: $staffId, range_start: $rangeStart, range_end: $rangeEnd) {
      start_date
      end_date
    }
  }
`;

export const GET_USER_APPOINTMENTS_DATES = gql`
  query($registeredUserId: ID!, $rangeStart: String, $rangeEnd: String) {
    getUserAppointments(registered_user_id: $registeredUserId, range_start: $rangeStart, range_end: $rangeEnd) {
      start_date
      end_date
    }
  }
`;

export const GET_REGISTERED_CLIENT_APPOINTMENTS = gql`
  query($registeredUserId: String!) {
    getRegisteredClientAppointments(registered_user_id: $registeredUserId) {
      ...AppointmentDataFragment
    }
  }
`;