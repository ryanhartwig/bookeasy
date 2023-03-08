import type { Appointment } from "../../types/Appointment";

const sampleStart = new Date();
sampleStart.setHours(8, 0, 0, 0);

const sampleEnd = new Date(sampleStart);
sampleEnd.setHours(sampleStart.getHours() + 1);

export const sample_appointments: Appointment[] = [{
    id: 'app1',
    user_id: 'christinabronson',
    service_id: 'initialconsult',
    business_id: 'christinabronson',
    client_id: 'stevenprice',
    start_date: sampleStart.getTime(),
    end_date: sampleEnd.getTime(),
  }
];