import db from "@/utility/db";
import { throwGQLError } from "@/utility/gql/throwGQLError";

export const serviceResolvers = {
  Mutation: {
    addService: async (parent: any, args: any) => {
      const { id, name, duration, provider, cost, is_video, color, deleted, business_id, assigned_users } = args.service;

      const addServiceResponse = await db.query(`insert into service values (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) returning *`, [id, business_id, name, duration, provider, cost, is_video, color, deleted]);

      if (!addServiceResponse.rowCount) throwGQLError('Error inserting service with id: ' + id);

      for (const user_id of assigned_users) {
        const response = await db.query('insert into users_services values ($1, $2) returning *', [id, user_id]);
        if (!response.rowCount) throwGQLError('Could not create relationships for user with id: ' + user_id)
      }

      return id;
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
    assigned_users: [String!]!,
  }

  type Mutation {
    addService(service: ServiceInput): String!
  }
`;

// id: string,
// name: string,
// duration: number,
// provider: string,
// cost: number,
// is_video: boolean,
// color: string,
// deleted: boolean,
// assigned_users: string[],
// business_id: string,