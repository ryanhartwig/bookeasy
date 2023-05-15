export interface User {
  id: string,
  name: string,
  email: string,
  created: string,
  phone?: number,
  avatar?: string,
  own_business_id: string,
  prefs?: {
    private_photo: boolean,
    private_email: boolean,
    private_phone: boolean,
    notification_booking: boolean,
    notification_reminder: boolean,
    notification_overview: boolean,
    notification_overview_time: string,
  };
};

export interface AssignedStaff {
  id: string,
  name: string,
  avatar?: string,
}

export interface Staff {
  id: string,
  registered_user_id: string,
  elevated: boolean,
  date_added: string,
  name: string,
  contact_email: string,
  contact_phone: string,
  avatar?: string
}