export const typeDefs = `#graphql
  type Query {
    hello: String!,
    user: User!,
  }

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
    own_business: Business,
    businesses: [Business!]!,
    name: String!,
    email: String!,
    phone: String!,
    created: String,
    prefs: UserPrefs!,
  }

  type Service {
    id: ID!,
    business: Business!,
    name: String!,
    duration: Int!,
    provider: String!,
    cost: Int!,
    is_video: Boolean!,
    color: String!,
    assigned_users: [User!]!
  }

  type Notification {
    user: User!,
    notification: String!,
    link: String,
    seen: Boolean!,
    created: String!
  }

  # This represents the role a user plays within a business and the date they were added.
  # It is only used when fetching a Businesses user list
  type BusinessUser {
    user: User!,
    elevated: Boolean!,
    date_added: Boolean!
  }

  type BusinessClient {
    client: Client,
    business: Business!,
    users: [BusinessUser!]!,
    notes: String,
    name: String!,
    email: String,
    address: String,
    phone: String,
    joined_date: String!
  }

  type Client {
    id: ID!,
    name: String!,
    email: String!,
    address: String,
    phone: String,
    avatar: String
  }

  type Business {
    id: ID!,
    name: String!,
    email: String,
    phone: String,
    min_booking_notice: Int!,
    min_cancel_notice: Int!,
    max_book_ahead: Int!
  }

  type AvailabilitySlice {
    user: User!,
    business: Business!,
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
`