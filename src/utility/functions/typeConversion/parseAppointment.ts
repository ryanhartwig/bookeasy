import { Appointment } from "@/types/Appointment";

export const parseToAppointment = (data: any): Appointment => {
  // if (Object.keys(data).some(k => !['id', 'startDate', 'endDate', 'serviceName', 'serviceDuration', 'serviceProvider', 'serviceCost', 'isVideo', 'isPaid', 'business', 'client', 'service'].includes(k))) {
  //   return null;
  // }
  
  return {
    ...data,
    businessId: data.business.id,
    clientId: data.client.id,
    serviceId: data.service.id
  } as Appointment;
}