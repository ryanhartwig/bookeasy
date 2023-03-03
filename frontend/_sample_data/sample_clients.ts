import type { Client } from "../_types/Client";

export const sample_clients: Client[] = [{
  id: 'stevenprice',
  name: 'Steven Price',
  email: 'steven.price@gmail.com',
  teams: ['christinabronson'],
  details: []
}, {
  id: 'alexanderstewart',
  name: 'Alexander Stewart',
  email: 'alexander.stewart@gmail.com',
  teams: ['christinabronson'],
  details: []
}, {
  id: 'emiliegray',
  name: 'Emilie Gray',
  email: 'emilie.gray@gmail.com',
  teams: ['johnsonteam'],
  details: [{
    notes: 'Cannot do full appointments, modified rate to accomodate for this',
  }]
}, {
  id: 'samuelcooper',
  name: 'Samuel Cooper',
  email: 'samuel.cooper@gmail.com',
  teams: ['johnsonteam'],
  details: []
}, {
  id: 'ethanblackwood',
  name: 'Ethan Blackwood',
  email: 'ethan.blackwood@gmail.com',
  teams: ['johnsonteam'],
  details: []
}];