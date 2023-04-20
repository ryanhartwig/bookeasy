import { GraphQLError } from "graphql";

export const throwError = (message: string, code?: string) => {
  throw new GraphQLError(message, {
    extensions: { code }
  })
}