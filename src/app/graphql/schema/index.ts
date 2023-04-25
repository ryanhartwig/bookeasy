import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userResolvers, userTypeDefs } from './userSchema';
import { types } from '../types';
import { appointmentsResolvers, appointmentsTypeDefs } from './appointmentsSchema';
import { businessResolvers, businessTypeDefs } from './businessSchema';

export const typeDefs = mergeTypeDefs([
  userTypeDefs, 
  appointmentsTypeDefs, 
  businessTypeDefs,
  types
]);

export const resolvers = mergeResolvers([
  userResolvers, 
  appointmentsResolvers,
  businessResolvers,
]);