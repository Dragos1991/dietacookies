import { gql } from "apollo-server-express";

const query = gql`
    type Query {
        currentUser(id: String!): User!
    }
`;

export { query };
