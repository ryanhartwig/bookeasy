import type { Appointment } from "../../types/Appointment";

const sampleStart = new Date();
sampleStart.setHours(8, 0, 0, 0);

const sampleEnd = new Date(sampleStart);
sampleEnd.setHours(sampleStart.getHours() + 1);

export const sample_appointments: Appointment[] = [{
    id: 'app1',
    userId: 'christinabronson',
    businessId: 'christinabronson',
    clientId: 'stevenprice',
    serviceId: 'initialconsult',
    startDate: sampleStart.getTime(),
    endDate: sampleEnd.getTime(),
    serviceCost: 0,
    serviceDuration: 60,
    isVideo: true,
    isPaid: true,
  }, {
    id: 'app2',
    userId: 'christinabronson',
    businessId: 'johnsonteam',
    clientId: 'emiliegray',
    serviceId: 'fullconsult',
    startDate: sampleStart.getTime() + 1000 * 60 * 60 * 1.5,
    endDate: sampleEnd.getTime() + 1000 * 60 * 60 * 1.75,
    serviceCost: 120,
    serviceDuration: 75,
    isVideo: true,
    isPaid: true,
  }
];