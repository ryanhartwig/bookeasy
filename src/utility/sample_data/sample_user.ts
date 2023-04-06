import type { User } from "../../types/User";

import avatarMale from '../../../public/assets/avatar_male.svg';
import avatarFemale from '../../../public/assets/avatar_female.svg';

export const sample_user: User = {
  id: 'christinabronson',
  ownBusinessId: 'christinabronson',
  name: 'Christina Bronson',
  email: 'christina.bronson@gmail.com',
  businessIds: [['johnsonteam', false]],
  avatar: avatarFemale,
  created: Date.now(),
};

export const sample_members: User[] = [{
  id: 'johngreenwood',
  ownBusinessId: '',
  name: 'John Greenwood',
  email: 'johng@gmail.com',
  businessIds: [['johnsonteam', false]],
  avatar: avatarMale,
  created: Date.now(),
}, {
  id: 'phillipwest',
  ownBusinessId: '',
  name: 'Phillip West',
  email: 'philwest@gmail.com',
  businessIds: [['johnsonteam', false]],
  avatar: avatarMale,
  created: Date.now(),
}, {
  id: 'Marly Johnson',
  ownBusinessId: '',
  name: 'Marly Johnson',
  email: 'mjohnson@gmail.com',
  businessIds: [['johnsonteam', true]],
  avatar: avatarFemale,
  created: Date.now(),
}]