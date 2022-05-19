import { gql } from "apollo-server-express";

const types = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        age: Int
        email: String!
        role: String!
        createdAt: String!
        updatedAt: String!
    }

    type SignOutSuccess {
        success: Boolean!
    }
`;

export { types };
