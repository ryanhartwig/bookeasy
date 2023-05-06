export interface User {
  id: string,
  name: string,
  email: string,
  created: string,
  phone?: number,
  avatar?: string,
  prefs?: {
    private_photo: boolean,
    private_email: boolean,
    private_phone: boolean,
    notification_booking: boolean,
    notification_reminder: boolean,
    notification_overview: boolean,
    notification_overview_time: string | null,
  };
};

export interface AssignedUser {
  id: string,
  name: string,
  avatar?: string,
}

export interface BusinessUser {
  user: User,
  elevated: boolean,
  date_added: string,
}