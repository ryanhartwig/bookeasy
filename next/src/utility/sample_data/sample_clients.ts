import type { Client } from "../../types/Client";

export const sample_clients: Client[] = [{
  id: 'stevenprice',
  name: 'Steven Price',
  email: 'steven.price@gmail.com',
  business_id: 'christinabronson',
}, {
  id: 'alexanderstewart',
  name: 'Alexander Stewart',
  email: 'alexander.stewart@gmail.com',
  business_id: 'christinabronson',
}, {
  id: 'emiliegray',
  name: 'Emilie Gray',
  email: 'emilie.gray@gmail.com',
  business_id: 'johnsonteam',
  details: {
    notes: 'Cannot do full appointments, modified rate to accomodate for this',
  }
}, {
  id: 'samuelcooper',
  name: 'Samuel Cooper',
  email: 'samuel.cooper@gmail.com',
  business_id: 'johnsonteam',
}, {
  id: 'ethanblackwood',
  name: 'Ethan Blackwood',
  email: 'ethan.blackwood@gmail.com',
  business_id: 'johnsonteam',
}];