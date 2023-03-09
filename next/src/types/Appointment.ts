export interface Appointment {
  id: string,
  user_id: string,
  business_id: string,
  client_id: string,
  service_id: string,
  start_date: number,
  end_date: number,
  service_name: string,
  service_duration: number,
  service_provider: string,
  service_cost: number,
  is_video: boolean,
};