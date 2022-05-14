import { gql } from "apollo-server-express";

const inputs = gql`
    input UserCreateInput {
        firstName: String!
        lastName: String!
        age: Int
        email: String!
        password: String!
    }

    input WhereUserId {
        id: ID!
    }
`;

export { inputs };
