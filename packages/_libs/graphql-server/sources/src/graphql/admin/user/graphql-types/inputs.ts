import { gql } from "apollo-server-express";

const inputs = gql`
    input UserData {
        firstName: String!
        lastName: String!
        age: Int
        email: String!
        password: String!
    }

    input WhereUserId {
        id: ID!
    }

    input LogInData {
        email: String!
        password: String!
    }
`;

export { inputs };
