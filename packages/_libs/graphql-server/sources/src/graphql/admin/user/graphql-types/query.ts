import { gql } from 'apollo-server-express';

const query = gql`
    type Query {
        currentUser: User
    }
`;

export { query };
