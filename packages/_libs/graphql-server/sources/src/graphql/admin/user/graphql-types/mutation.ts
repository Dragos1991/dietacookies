import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        createUser(data: UserCreateInput!): User!
        authenticateUser(data: UserAuthenticateInput!): User!
        signOutUser: SignOutSuccess!
    }
`;

export { mutation };
