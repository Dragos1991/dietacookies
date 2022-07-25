import { composeResolvers } from '@graphql-tools/resolvers-composition';

import { authenticateUser, createUser, deleteUser, signOutUser, updateUser } from './mutations';
import { currentUser } from './queries';

const userResolvers = {
    Query: {
        currentUser,
    },
    Mutation: {
        createUser,
        updateUser,
        deleteUser,
        authenticateUser,
        signOutUser,
    },
};

const resolversComposition = {};

const composedResolvers = composeResolvers(userResolvers, resolversComposition);

export { composedResolvers as userResolvers };
