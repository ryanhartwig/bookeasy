import { GraphQLError } from "graphql";

export const throwGQLError = (message: string, code?: string) => {
  throw new GraphQLError(message, {
    extensions: { code }
  })
}