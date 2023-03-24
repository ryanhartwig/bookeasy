export interface Business {
  id: string,
  name: string,
  email: string | null,
  phone: number | null,
  photo: any,
  prefs: {
    min_booking_notice: number | null,
    min_cancel_notice: number | null,
    max_book_ahead: number | null,
  }
};