import { gql } from '@apollo/client';

export const GET_USER_APPOINTMENTS = gql`
  query($userId: ID!, $rangeStart: String, $rangeEnd: String) {
    getUserAppointments(user_id: $userId, range_start: $rangeStart, range_end: $rangeEnd) {
      id
      service {
        name
        duration
        color
      }
      business {
        name
      }
      client {
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
  mutation($appointment: AppointmentInput!) {
    addEditAppointment(appointment: $appointment) {
      id
      service {
        name
        duration
        color
      }
      business {
        name
      }
      client {
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
      name
      duration
      color
    }
    business {
      name
    }
    client {
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