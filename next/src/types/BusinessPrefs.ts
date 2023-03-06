export interface BusinessPrefs {
  business_id: string,
  min_booking_notice: number | null,
  min_cancel_notice: number | null,
  max_book_ahead: number | null,
}