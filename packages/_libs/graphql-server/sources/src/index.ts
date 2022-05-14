import graphqlDepthLimit from "graphql-depth-limit";

export { ApolloServer } from "apollo-server-express";
export { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
export { GraphQLError } from "graphql";

export * from "./graphql";

export const depthLimit = graphqlDepthLimit;
