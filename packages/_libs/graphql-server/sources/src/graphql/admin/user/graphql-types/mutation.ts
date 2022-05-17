import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        createUser(data: UserCreateInput!): User!
    }
`;

export { mutation };
