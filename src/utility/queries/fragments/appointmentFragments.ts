import { gql } from '@apollo/client';

export const APPOINTMENT_DATA_FRAGMENT = gql`
  fragment AppointmentDataFragment on Appointment {
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
    staff {
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
`;

export const NEW_APPOINTMENT_FRAGMENT = gql`
  fragment NewAppointment on Appointment {
    ...AppointmentDataFragment
  }
`;