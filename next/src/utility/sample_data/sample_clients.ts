import type { Client } from "../../types/Client";

import avatarMale from '../../../public/assets/avatar_male.svg';
import avatarFemale from '../../../public/assets/avatar_female.svg';

export const sample_clients: Client[] = [{
  id: 'stevenprice',
  name: 'Steven Price',
  email: 'steven.price@gmail.com',
  business_id: 'christinabronson',
  phone: '905-923-2359',
  address: '2402 Plains Rd. East, Hamilton',
  avatar: avatarMale,
  created: Date.now(),
  active: true,
}, {
  id: 'alexanderstewart',
  name: 'Alexander Stewart',
  email: 'alexander.stewart@gmail.com',
  business_id: 'christinabronson',
  phone: '905-923-1242',
  address: '2412 Plains Rd. West, Hamilton',
  avatar: avatarMale,
  created: Date.now(),
  active: true,
}, {
  id: 'emiliegray',
  name: 'Emilie Gray',
  email: 'emilie.gray@gmail.com',
  business_id: 'johnsonteam',
  phone: '905-353-5315',
  address: '1212 Plains Rd. East, Hamilton',
  notes: 'Cannot do full appointments, modified rate to accomodate for this',
  avatar: avatarFemale,
  created: Date.now(),
  active: true,
}, {
  id: 'samuelcooper',
  name: 'Samuel Cooper',
  email: 'samuel.cooper@gmail.com',
  business_id: 'johnsonteam',
  phone: '905-565-3531',
  address: '1355 Plains Rd. East, Hamilton',
  avatar: avatarMale,
  created: Date.now(),
  active: true,
}, {
  id: 'ethanblackwood',
  name: 'Ethan Blackwood',
  email: 'ethan.blackwood@gmail.com',
  business_id: 'johnsonteam',
  phone: '905-264-4644',
  address: '1245 Plains Rd. West, Hamilton',
  avatar: avatarMale,
  created: Date.now(),
  active: true,
}];