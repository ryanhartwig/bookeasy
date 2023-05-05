export interface User {
  id: string,
  name: string,
  email: string,
  ownBusinessId?: string | null,
  businessIds?: [string, boolean][],
  created: string,
  phone?: number,
  avatar?: string,
  prefs?: {
    privatePhoto: boolean,
    privateEmail: boolean,
    privatePhone: boolean,
    notificationBooking: boolean,
    notificationReminder: boolean,
    notificationOverview: boolean,
    notificationOverviewTime: string | null,
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