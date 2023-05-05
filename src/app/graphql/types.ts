export const types = `#graphql
  type UserPrefs {
    private_photo: Boolean!,
    private_email: Boolean!,
    private_phone: Boolean!,
    notification_booking: Boolean!,
    notification_reminder: Boolean!,
    notification_overview: Boolean!,
    notification_overview_time: String
  }

  type User {
    id: ID!,
    name: String!,
    email: String!,
    phone: String!,
    created: String,
    prefs: UserPrefs!,
    avatar: String,
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
    assigned_users: [User!]!
  }

  type Notification {
    user: User!,
    notification: String!,
    link: String,
    seen: Boolean!,
    created: String!
  }

  

  type BusinessClient {
    # users: [BusinessUser!]!,
    id: String!,
    notes: String,
    name: String, 
    email: String,
    address: String,
    phone: String,
    joined_date: String!,
    avatar: String,
    active: Boolean!
  }

  type Client {
    id: ID!,
    name: String!,
    email: String!,
    address: String,
    phone: String,
    avatar: String
  }

  type MultiClient {
    client: Client!,
    business_patch: BusinessClient!,
  }

  # This represents the role a user plays within a business and the date they were added.
  # It is only used when fetching a Businesses user list
  type BusinessUser {
    user: User!,
    elevated: Boolean!,
    date_added: String!
  } 

  type Business {
    id: ID!,
    name: String!,
    email: String,
    phone: String,
    min_booking_notice: String!,
    min_cancel_notice: String!,
    max_book_ahead: String!,
    user_id: String,
    avatar: String,
    created: String!,
    users: [BusinessUser!]!,
  }

  type AvailabilitySlice {
    business_id: String!,
    day: Int!,
    start_time: String!,
    end_time: String!
  }

  type Appointment {
    id: ID!,
    user: User!,
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