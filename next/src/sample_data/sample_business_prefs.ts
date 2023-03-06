import type { BusinessPrefs } from "../types/BusinessPrefs"

export const sample_business_prefs: BusinessPrefs[] = [{
  business_id: 'johnsonteam',
  min_booking_notice: 1000 * 60 * 60 * 24, // 1 day
  min_cancel_notice: 1000 * 60 * 60 * 24,
  max_book_ahead: 1000 * 60 * 60 * 24 * 30, // 1 month
}, {
  business_id: 'christinabronson',
  min_booking_notice: 1000 * 60 * 60 * 24, // 1 day
  min_cancel_notice: 1000 * 60 * 60 * 24,
  max_book_ahead: null,
}];