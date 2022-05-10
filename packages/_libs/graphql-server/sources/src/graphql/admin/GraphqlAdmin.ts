import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import type { GraphQLSchema } from "graphql";
import type { IAdminContext } from "./types/types";

import { userResolvers } from "./user/resolvers";

import { userTypes } from "./user";

const typeDefs = mergeTypeDefs([userTypes]);
const resolvers = mergeResolvers([userResolvers]);

const createSchema = async (): Promise<GraphQLSchema | undefined> => {
    try {
        const schema = makeExecutableSchema({
            typeDefs,
            resolvers,
        });

        return await schema;
    } catch (error) {
        console.log(error);
    }
};

const createContext = ({ req, res, applicationContext }: IAdminContext) => {
    const context = {
        req,
        res,
        ...applicationContext,
    };

    return context;
};

export const GraphqlAdmin = {
    createContext,
    createSchema,
};
