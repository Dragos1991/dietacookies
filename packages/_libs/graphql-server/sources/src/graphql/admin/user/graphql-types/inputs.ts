import { gql } from "apollo-server-express";

const inputs = gql`
    input UserCreateInput {
        firstName: String!
        lastName: String!
        age: Int
        email: String!
        password: String!
    }

    input UserAuthenticateInput {
        email: String!
        password: String!
        rememberMe: Boolean
    }

    input WhereUserId {
        id: ID!
    }
`;

export { inputs };
