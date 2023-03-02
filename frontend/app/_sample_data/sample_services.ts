import type { Service } from "../_types/Service";

export const sample_services: Service[] = [{
  id: 'initialconsult',
  business_id: 'christinabronson',
  cost: 0,
  duration: 60,
  name: 'Initial Consult',
  provider: 'Christina Bronson',
  is_video: true,
}, {
  id: 'fullconsult',
  business_id: 'johnsonteam',
  cost: 120,
  duration: 75,
  name: 'Full Consult',
  provider: 'Johnson Team',
  is_video: true,
}, {
  id: 'reviewmeeting',
  business_id: 'johnsonteam',
  cost: 80,
  duration: 30,
  name: 'Review Meeting',
  provider: 'Johnson Team',
  is_video: true,
}];