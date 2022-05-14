import { composeResolvers } from "@graphql-tools/resolvers-composition";

import { currentUser } from "./queries";
import { createUser } from "./mutations";

const userResolvers = {
    Query: {
        currentUser,
    },
    Mutation: {
        createUser,
    },
};

const resolversComposition = {};

const composedResolvers = composeResolvers(userResolvers, resolversComposition);

export { composedResolvers as userResolvers };
