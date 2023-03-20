import type { Business } from "../../types/Business";

import avatarMale from '../../../public/assets/avatar_male.svg';
import avatarFemale from '../../../public/assets/avatar_female.svg';

export const sample_businesses: Business[] = [{
  id: 'christinabronson',
  name: 'Christina Bronson',
  email: 'christina.bronson@gmail.com',
  phone: null,
  photo: avatarFemale,
  elevated: true,
}, {
  id: 'johnsonteam',
  name: 'Johnson Team',
  email: 'inquire.johnsonteam@gmail.com',
  phone: 1234567890,
  photo: avatarMale,
  elevated: false,
}];