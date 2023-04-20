import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userResolvers, userTypeDefs } from './userSchema';
import { types } from '../types';

export const typeDefs = mergeTypeDefs([userTypeDefs, types]);
export const resolvers = mergeResolvers([userResolvers]);