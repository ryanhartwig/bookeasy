import type { Appointment } from "../../types/Appointment";

const sampleStart = new Date();
sampleStart.setHours(8, 0, 0, 0);

const sampleEnd = new Date(sampleStart);
sampleEnd.setHours(sampleStart.getHours() + 1);

export const sample_appointments: Appointment[] = [{
    id: 'app1',
    user_id: 'christinabronson',
    business_id: 'christinabronson',
    client_id: 'stevenprice',
    service_id: 'initialconsult',
    start_date: sampleStart.getTime(),
    end_date: sampleEnd.getTime(),
    service_cost: 0,
    service_duration: 60,
    service_name: 'Initial Consult',
    service_provider: 'Christina Bronson',
    is_video: true,
  }, {
    id: 'app2',
    user_id: 'christinabronson',
    business_id: 'christinabronson',
    client_id: 'emiliegray',
    service_id: 'fullconsult',
    start_date: sampleStart.getTime() + 1000 * 60 * 60 * 1.5,
    end_date: sampleEnd.getTime() + 1000 * 60 * 60 * 1.75,
    service_cost: 120,
    service_duration: 75,
    service_name: 'Full Consult',
    service_provider: 'Johnson Team',
    is_video: true,
  }
];