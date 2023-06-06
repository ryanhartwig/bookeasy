import db from "@/utility/db";

export const appointmentsResolvers = {
  Mutation: {
    addEditAppointment: async (_: any, args: any) => {
      const { id, staff_id, service_id, business_id, client_id, start_date, end_date, service_cost, is_video, is_paid, service_duration } = args.appointment; 

      const query = args.edit 
        // update existing appointment
          ? `update appointment set
          staff_id = $2, service_id = $3, business_id = $4, client_id = $5, start_date = $6, end_date = $7, service_cost = $8, is_video = $9, is_paid = $10, service_duration = $11 
          where id = $1 returning *`
        // create new appointment
          : `insert into appointment values (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
          ) returning *`
      ;

      const response = await db.query(query, [id, staff_id, service_id, business_id, client_id, start_date, end_date, service_cost, is_video, is_paid, service_duration]);
      return response.rows[0];
    },
    deleteAppointment: async (_: any, args: any) => {
      const response = await db.query('delete from appointment where id = $1 returning id', [args.id]);
      return response.rows[0].id;
    },
  },
  Query: {
    getUserAppointments: async (_: any, args: any) => {
      const { registered_user_id, range_start, range_end } = args;

      let query = `
        select * from appointment where staff_id in (
          select id from staff where registered_user_id = $1
        )
      `;
      const params = [registered_user_id]

      if (range_start && range_end) {
        params.push(range_start, range_end);
        query += ' and start_date between $2 and $3';
      }

      const response = await db.query(query, params);
      return response.rows;
    },
    getClientAppointments: async (_: any, args: any) => {
      const response = await db.query('select * from appointment where client_id = $1', [args.client_id]);
      return response.rows;
    },
    getStaffAppointments: async (_: any, args: any) => {
      const { staff_id, range_start, range_end } = args;

      let query = `
        select * from appointment where staff_id = $1
      `;
      const params = [staff_id]

      if (range_start && range_end) {
        params.push(range_start, range_end);
        query += ' and start_date between $2 and $3';
      }

      const response = await db.query(query, params);
      return response.rows;
    },
  },
  
  
  Appointment: {
    service: async (parent: any) => {
      const response = await db.query('select * from service where id = $1', [parent.service_id]);
      return response.rows[0];
    },
    business: async (parent: any) => {
      const response = await db.query('select * from business where id = $1', [parent.business_id]);
      return response.rows[0];
    },
    client: async (parent: any) => {
      const response = await db.query('select * from client where id = $1', [parent.client_id]);
      return response.rows[0];
    },
    staff: async (parent: any) => {
      const response = await db.query('select * from staff where id = $1', [parent.staff_id]);
      return response.rows[0];
    },
  }
}

export const appointmentsTypeDefs = `#graphql
  input AppointmentInput {
    id: String!,
    staff_id: String!,
    service_id: String!,
    business_id: String!,
    client_id: String!,
    start_date: String!,
    end_date: String!,
    service_cost: Int!,
    is_video: Boolean!,
    is_paid: Boolean!,
    service_duration: Int!,
  }

  type Query {
    getUserAppointments(registered_user_id: ID!, range_start: String, range_end: String): [Appointment!]!,
    getClientAppointments(client_id: ID!): [Appointment!]!,
    getStaffAppointments(staff_id: ID!, range_start: String, range_end: String): [Appointment!]!,
  }
  type Mutation {
    addEditAppointment(appointment: AppointmentInput!, edit: Boolean): Appointment!,
    deleteAppointment(id: String!): String!,
  }
`;