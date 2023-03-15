import type { User } from "../../types/User";

import avatarMale from '../../../public/assets/avatar_male.svg';
import avatarFemale from '../../../public/assets/avatar_female.svg';

export const sample_user: User = {
  id: 'christinabronson',
  own_business_id: 'christinabronson',
  name: 'Christina Bronson',
  email: 'christina.bronson@gmail.com',
  business_ids: ['johnsonteam'],
  avatar: avatarFemale,
};

export const sample_members: User[] = [{
  id: 'johngreenwood',
  own_business_id: '',
  name: 'John Greenwood',
  email: 'johng@gmail.com',
  business_ids: ['johnsonteam'],
  avatar: avatarMale
}, {
  id: 'phillipwest',
  own_business_id: '',
  name: 'Phillip West',
  email: 'philwest@gmail.com',
  business_ids: ['johnsonteam'],
  avatar: avatarMale
}, {
  id: 'Marly Johnson',
  own_business_id: '',
  name: 'Marly Johnson',
  email: 'mjohnson@gmail.com',
  business_ids: ['johnsonteam'],
  avatar: avatarMale
}]