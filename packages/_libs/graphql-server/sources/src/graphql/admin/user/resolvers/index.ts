import { composeResolvers } from "@graphql-tools/resolvers-composition";

import { currentUser } from "./queries";
import {
    createUser,
    updateUser,
    deleteUser,
    authenticateUser,
    signOutUser,
} from "./mutations";

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
