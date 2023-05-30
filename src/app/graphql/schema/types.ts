export const types = `#graphql
  type UserPrefs {
    registered_user_id: String!,
    private_photo: Boolean!,
    private_email: Boolean!,
    private_phone: Boolean!,
    notification_booking: Boolean!,
    notification_reminder: Boolean!,
    notification_overview: Boolean!,
    notification_overview_time: String!,
  }

  type RegisteredUser {
    id: ID!,
    name: String!,
    email: String!,
    phone: String,
    created: String,
    prefs: UserPrefs!, 
    avatar: String,
    business_id: String,
  }

  # Staff member of a team or own business. 
  # All clients, appointments, services use THIS id as their foreign key (not the RegisteredUser's id)
  type Staff {
    id: ID!,
    registered_user_id: String,
    elevated: Boolean!,
    date_added: String!,
    name: String!,
    contact_email: String,
    contact_phone: String,
    avatar: String, # added from regUser if exists
    deleted: Boolean!,
    pending_registration_id: String,
  } 

  type Service {
    id: ID!,
    name: String!,
    duration: Int!,
    provider: String!,
    cost: Int!,
    is_video: Boolean!,
    color: String!,
    deleted: Boolean!,
    business_id: String!,
    assigned_staff: [Staff!]!
  }

  type Notification {
    registered_user_id: String!,
    notification: String!,
    link: String,
    seen: Boolean!,
    created: String!
  }

  type Client {
    id: String!,
    registered_client_id: String,
    notes: String,
    name: String!, 
    email: String,
    address: String,
    phone: String,
    joined_date: String!,
    avatar: String, # combined / merged from registered client
    active: Boolean!,
  }

  type RegisteredClient {
    id: ID!,
    name: String!,
    email: String!,
    phone: String,
    avatar: String
  }

  type Business {
    id: ID!,
    name: String!,
    email: String,
    phone: String,
    min_booking_notice: String,
    min_cancel_notice: String,
    max_book_ahead: String,
    avatar: String,
    created: String!,
    booking_site_id: String,
    creator_id: String!,
    staff: [Staff!]!,
  }

  type AvailabilitySlice {
    business_id: String!,
    day: Int!,
    start_time: String!,
    end_time: String!
  }

  type Appointment {
    id: ID!,
    staff: Staff!,
    service: Service!,
    business: Business!,
    client: Client!,
    start_date: String!,
    end_date: String!,
    service_duration: Int!,
    service_cost: Int!,
    is_video: Boolean!,
    is_paid: Boolean!
  }

  type AppointmentMetric {
    is_paid: Boolean!,
    service_cost: Int!,
  }
`