import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userResolvers, userTypeDefs } from './userSchema';
import { types } from '../types';
import { appointmentsResolvers, appointmentsTypeDefs } from './appointmentsSchema';

export const typeDefs = mergeTypeDefs([userTypeDefs, appointmentsTypeDefs, types]);
export const resolvers = mergeResolvers([userResolvers, appointmentsResolvers]);