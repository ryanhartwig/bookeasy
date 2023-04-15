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