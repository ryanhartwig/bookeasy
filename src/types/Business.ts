export interface NewBusiness {
  id: string,
  name: string,
  email: string | null,
  phone: string | null,
  min_booking_notice: string | null,
  min_cancel_notice: string | null,
  max_book_ahead: string | null,
  avatar: string | null,
  created: string,
  booking_site_id: string | null,
  creator_id: string,
}

export interface FormBusiness {
  id: string,
  name: string,
}