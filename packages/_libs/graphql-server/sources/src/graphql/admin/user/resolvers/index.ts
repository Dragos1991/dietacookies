import { composeResolvers } from "@graphql-tools/resolvers-composition";

import { currentUser } from "./queries";
import { createUser, authenticateUser, signOutUser } from "./mutations";

const userResolvers = {
    Query: {
        currentUser,
    },
    Mutation: {
        createUser,
        authenticateUser,
        signOutUser,
    },
};

const resolversComposition = {};

const composedResolvers = composeResolvers(userResolvers, resolversComposition);

export { composedResolvers as userResolvers };
