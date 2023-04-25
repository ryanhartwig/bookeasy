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
  email: string,
  phone: string,
  min_booking_notice: string,
  min_cancel_notice: string,
  max_book_ahead: string,
}

export interface FormBusiness {
  id: string,
  name: string,
}