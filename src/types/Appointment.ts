/**
 * Includes all necessary fields to fill appointment cards
 */
export interface AppointmentData {
  id: string,
  service: {
    id: string,
    name: string,
    duration: number,
    color: string,
  }
  business: {
    id: string,
    name: string,
  }
  client: {
    id: string,
    name: string,
  }
  start_date: string,
  end_date: string,
  service_duration: number,
  service_cost: number,
  is_video: boolean,
  is_paid: boolean
}

export interface AppointmentInput {
  id: string,
  staff_id: string,
  business_id: string,
  client_id: string,
  service_id: string,
  start_date: string,
  end_date: string,
  service_duration: number,
  service_cost: number,
  is_video: boolean,
  is_paid: boolean,
};

export interface AppointmentMetrics {
  is_paid: boolean,
  service_cost: number,
}

export interface AppointmentDates {
  start_date: string,
  end_date: string,
}