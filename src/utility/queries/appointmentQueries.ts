import { gql } from '@apollo/client';

export const GET_USER_APPOINTMENTS = gql`
  query($userId: ID!, $rangeStart: String, $rangeEnd: String) {
    getUserAppointments(user_id: $userId, range_start: $rangeStart, range_end: $rangeEnd) {
      id
      service {
        id
        name
        duration
        color
      }
      business {
        id
        name
      }
      client {
        id
        name
      }
      start_date
      end_date
      service_duration
      service_cost
      is_video
      is_paid
    }
  }
`;

export const ADD_EDIT_APPOINTMENT = gql`
  mutation($appointment: AppointmentInput!, $edit: Boolean) {
    addEditAppointment(appointment: $appointment, edit: $edit) {
      id
      service {
        id
        name
        duration
        color
      }
      business {
        id
        name
      }
      client {
        id
        name 
      }
      start_date
      end_date
      service_duration
      service_cost
      is_video
      is_paid
    } 
  }
`

export const NEW_APPOINTMENT_FRAGMENT = gql`
  fragment NewAppointment on Appointment {
    id
    service {
      id
      name
      duration
      color
    }
    business {
      id
      name
    }
    client {
      id
      name 
    }
    start_date
    end_date
    service_duration
    service_cost
    is_video
    is_paid
  }
`