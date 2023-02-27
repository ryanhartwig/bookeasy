import type { Service } from "../types/Service";

export const sample_services: Service[] = [{
  id: 'initialconsult',
  business_id: 'christinabronson',
  cost: 0,
  duration: 60,
  name: 'Initial Consult',
  provider: 'Christina Bronson'
}, {
  id: 'fullconsult',
  business_id: 'johnsonteam',
  cost: 120,
  duration: 75,
  name: 'Full Consult',
  provider: 'Johnson Team'
}, {
  id: 'reviewmeeting',
  business_id: 'johnsonteam',
  cost: 80,
  duration: 30,
  name: 'Review Meeting',
  provider: 'Johnson Team'
}];