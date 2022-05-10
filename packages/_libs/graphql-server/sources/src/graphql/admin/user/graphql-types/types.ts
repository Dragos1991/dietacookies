import { gql } from "apollo-server-express";

const types = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        age: Int
        email: String!
    }

    type LogOutUserCompleted {
        completed: Boolean!
    }
`;

export { types };
