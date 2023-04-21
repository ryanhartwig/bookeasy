export interface Appointment {
  id: string,
  userId: string,
  businessId: string,
  clientId: string,
  serviceId: string,
  startDate: number,
  endDate: number,
  serviceDuration: number,
  serviceCost: number,
  isVideo: boolean,
  isPaid: boolean,
};

/**
 * Includes all necessary fields to fill appointment cards
 */
export interface AppointmentData {
  id: string,
  service: {
    name: string,
    duration: number,
    color: string,
  }
  business: {
    name: string
  }
  client: {
    name: string,
  }
  start_date: string,
  end_date: string,
  service_duration: number,
  service_cost: number,
  is_video: boolean,
  is_paid: boolean
}