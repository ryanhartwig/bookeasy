import type { Service } from "../../types/Service";

export const sample_services: Service[] = [{
  id: 'initialconsult',
  businessId: 'christinabronson',
  cost: 0,
  duration: 60,
  name: 'Initial Consult',
  provider: 'Christina Bronson',
  isVideo: true,
  color: '#BA1682',
  userIds: ['christinabronson'],
}, {
  id: 'fullconsult',
  businessId: 'johnsonteam',
  cost: 120,
  duration: 75,
  name: 'Full Consult',
  provider: 'Johnson Team',
  isVideo: true,
  color: '#1626BA',
  userIds: ['christinabronson', 'johngreenwood'],
}, {
  id: 'reviewmeeting',
  businessId: 'johnsonteam',
  cost: 80,
  duration: 30,
  name: 'Review Meeting',
  provider: 'Johnson Team',
  isVideo: true,
  color: '#BAAA16',
  userIds: ['christinabronson'],
}];