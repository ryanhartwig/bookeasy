export interface UserPrefs {
  user_id: string,
  private_photo: boolean,
  private_email: boolean,
  private_phone: boolean,
  notification_booking: boolean,
  notification_reminder: boolean,
  notification_overview: boolean,
  notification_overview_time: string | null,
};