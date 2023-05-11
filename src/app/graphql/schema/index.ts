import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userResolvers, userTypeDefs } from './userSchema';
import { types } from '../types';
import { appointmentsResolvers, appointmentsTypeDefs } from './appointmentsSchema';
import { businessResolvers, businessTypeDefs } from './businessSchema';
import { clientResolvers, clientTypeDefs } from './clientSchema';
import { serviceResolvers, serviceTypeDefs } from './serviceSchema';

export const typeDefs = mergeTypeDefs([
  // userTypeDefs, 
  appointmentsTypeDefs, 
  // businessTypeDefs,
  // clientTypeDefs,
  // serviceTypeDefs,
  types,
]);

export const resolvers = mergeResolvers([
  // userResolvers, 
  appointmentsResolvers,
  // businessResolvers,
  // clientResolvers,
  // serviceResolvers,
]);