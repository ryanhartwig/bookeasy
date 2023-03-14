import type { Client } from "../../types/Client";

import avatarMale from '../../../public/assets/avatar_male.svg';
import avatarFemale from '../../../public/assets/avatar_female.svg';

export const sample_clients: Client[] = [{
  id: 'stevenprice',
  name: 'Steven Price',
  email: 'steven.price@gmail.com',
  business_id: 'christinabronson',
  avatar: avatarMale,
}, {
  id: 'alexanderstewart',
  name: 'Alexander Stewart',
  email: 'alexander.stewart@gmail.com',
  business_id: 'christinabronson',
  avatar: avatarMale,
}, {
  id: 'emiliegray',
  name: 'Emilie Gray',
  email: 'emilie.gray@gmail.com',
  business_id: 'johnsonteam',
  details: {
    notes: 'Cannot do full appointments, modified rate to accomodate for this',
  },
  avatar: avatarFemale,
}, {
  id: 'samuelcooper',
  name: 'Samuel Cooper',
  email: 'samuel.cooper@gmail.com',
  business_id: 'johnsonteam',
  avatar: avatarMale,
}, {
  id: 'ethanblackwood',
  name: 'Ethan Blackwood',
  email: 'ethan.blackwood@gmail.com',
  business_id: 'johnsonteam',
  avatar: avatarMale,
}];