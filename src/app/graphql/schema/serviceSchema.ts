import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

export const serviceResolvers = {
  Mutation: {
    addService: async (parent: any, args: any) => {
      const { id, name, duration, provider, cost, is_video, color, deleted, business_id, assigned_users } = args.service;

      await db.query(`insert into service values (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) returning *`, [id, business_id, name, duration, provider, cost, is_video, color, deleted]);

      for (const user_id of assigned_users) {
        await db.query('insert into users_services values ($1, $2) returning *', [id, user_id]);
      }

      return id;
    },
    editService: async (parent: any, args: any) => {
      const { id, name, cost, duration, color, is_video, assigned_users } = args.service;

      await db.query(`update service set
        name = $2,
        cost = $3, 
        duration = $4, 
        is_video = $5,
        color = $6
      where id = $1`, [id, name, cost, duration, is_video, color]);
      
      await db.query('delete from users_services where service_id = $1', [id]);
      for (const user_id of assigned_users) {
        await db.query('insert into users_services values ($1, $2)', [id, user_id]);
      }

      return id;
    }
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
    assigned_users: [String!]!,
  }

  type Mutation {
    addService(service: ServiceInput): String!,
    editService(service: ServiceInput): String!,
  }
`;