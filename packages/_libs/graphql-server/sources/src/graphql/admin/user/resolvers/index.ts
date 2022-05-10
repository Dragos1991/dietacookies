import { composeResolvers } from "@graphql-tools/resolvers-composition";

import { currentUser } from "./queries";
import { register, logOut } from "./mutations";

const userResolvers = {
    Query: {
        currentUser,
    },
    Mutation: {
        register,
        logOut,
    },
};

const resolversComposition = {};

const composedResolvers = composeResolvers(userResolvers, resolversComposition);

export { composedResolvers as userResolvers };
