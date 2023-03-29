import { Appointment } from "@/types/Appointment";

export const parseToAppointment = (data: any): Appointment => {
  // if (Object.keys(data).some(k => !['id', 'startDate', 'endDate', 'serviceName', 'serviceDuration', 'serviceProvider', 'serviceCost', 'isVideo', 'isPaid', 'business', 'client', 'service'].includes(k))) {
  //   return null;
  // }
  
  return {
    businessId: data.business.id,
    clientId: data.client.id,
    serviceId: data.service.id,
    id: data.id,
    startDate: data.startDate,
    endDate: data.endDate,
    serviceName: data.serviceName,
    serviceDuration: data.serviceDuration,
    serviceProvider: data.serviceProvider,
    serviceCost: data.serviceCost,
    isVideo: data.isVideo,
    isPaid: data.isPaid,
    userId: "user_01GWHJK2PJ3C1DGYJY32YSJFQ3",
  } as Appointment;
}