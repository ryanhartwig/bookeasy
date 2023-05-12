import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

export const serviceResolvers = {
  Mutation: {
    addService: async (_: any, args: any) => {
      const { id, name, duration, provider, cost, is_video, color, deleted, business_id, assigned_staff } = args.service;
      await db.query(`insert into service (id, business_id, name, duration, provider, cost, is_video, color, deleted)
      values ( $1, $2, $3, $4, $5, $6, $7, $8, $9 ) 
      returning *`, [id, business_id, name, duration, provider, cost, is_video, color, deleted]);

      const mapParams = [id]
      const pairs = assigned_staff.map((staff_id: string, i: number) => {
        mapParams.push(staff_id);
        return `($1, $${i + 2})`;
      });
      await db.query(`
        insert into staff_services (service_id, staff_id) 
        values ${pairs.join(', ')} 
        returning *`
      , mapParams);

      return id;
    },
    editService: async (_: any, args: any) => {
      const { id, name, cost, duration, color, is_video, assigned_staff, cost_start, duration_start } = args.service;

      try {
        await db.query('begin');
        await db.query(`
          update service set
            name = $2,
            cost = $3, 
            duration = $4, 
            is_video = $5,
            color = $6
          where id = $1`
        , [id, name, cost, duration, is_video, color]);
        
        await db.query('delete from staff_services where service_id = $1', [id]);
        const mapParams = [id]
        const pairs = assigned_staff.map((staff_id: string, i: number) => {
          mapParams.push(staff_id);
          return `($1, $${i + 2})`;
        });
        await db.query(`
          insert into staff_services (service_id, staff_id) 
          values ${pairs.join(', ')} 
          returning *`
        , mapParams);

        if (cost_start) {
          await db.query('update appointment set service_cost = $1 where start_date > $2 and service_id = $3', [cost, cost_start, id])
        }

        if (duration_start) {
          await db.query('update appointment set service_duration = $1 where start_date > $2 and service_id = $3', [duration, duration_start, id])
        }

        await db.query('commit');
      } catch(e) {
        await db.query('rollback');
        throw e;
      }
      return id;
    },
    deleteService: async (_: any, args: any) => {
      const { service_id } = args;
      try {
        const response = await db.query('delete from service where id = $1 returning id', [service_id]);
        return response.rows[0].id;
      } catch(e: any) {
        if(e?.constraint && e.constraint === 'appointment_service_id_fkey') {
          // Appointment exists for service and won't allow full deletion
          // - therefore we set deleted property to true, to allow appointments to ref service
          const updateResponse = await db.query('update service set deleted = true where id = $1 returning id', [service_id]);
          return updateResponse.rows[0].id;
        }
      }

      return service_id;
    },
  },
}

export const serviceTypeDefs = `#graphql
  input ServiceInput {
    id: ID!,
    name: String!,
    duration: Int!,
    provider: String!,
    cost: Int!,
    is_video: Boolean!,
    color: String!,
    deleted: Boolean!,
    business_id: String!,
    assigned_staff: [String!]!,
    cost_start: String,
    duration_start: String,
  }

  type Mutation {
    addService(service: ServiceInput): String!,
    editService(service: ServiceInput): String!,
    deleteService(service_id: String!): String!,
  }
`;