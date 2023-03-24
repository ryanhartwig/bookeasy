import type { Business } from "../../types/Business";

import avatarMale from '../../../public/assets/avatar_male.svg';
import avatarFemale from '../../../public/assets/avatar_female.svg';

export const sample_businesses: Business[] = [{
  id: 'christinabronson',
  name: 'Christina Bronson',
  email: 'christina.bronson@gmail.com',
  phone: null,
  photo: avatarFemale,
  prefs: {
    min_booking_notice: 1000 * 60 * 60 * 24, // 1 day
    min_cancel_notice: 1000 * 60 * 60 * 24,
    max_book_ahead: 1000 * 60 * 60 * 24 * 30, // 1 month
  }
}, {
  id: 'johnsonteam',
  name: 'Johnson Team',
  email: 'inquire.johnsonteam@gmail.com',
  phone: 1234567890,
  photo: avatarMale,
  prefs: {
    min_booking_notice: 1000 * 60 * 60 * 24, // 1 day
    min_cancel_notice: 1000 * 60 * 60 * 24,
    max_book_ahead: null,
  }
}];