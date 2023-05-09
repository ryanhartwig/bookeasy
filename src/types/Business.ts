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

export interface NewBusiness {
  id: string,
  name: string,
  email: string | null,
  phone: string | null,
  min_booking_notice: string | null,
  min_cancel_notice: string | null,
  max_book_ahead: string | null,
  avatar: string | null,
  user_id: string | null,
  created: string,
}

export interface FormBusiness {
  id: string,
  name: string,
}