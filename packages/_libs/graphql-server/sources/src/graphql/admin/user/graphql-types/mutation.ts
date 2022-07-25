import { gql } from 'apollo-server-express';

const mutation = gql`
    type Mutation {
        createUser(data: UserCreateInput!): User!
        updateUser(data: UserUpdateInput!): User!
        deleteUser(data: UserDeleteInput): User!
        authenticateUser(data: UserAuthenticateInput!): User!
        signOutUser: SignOutSuccess!
    }
`;

export { mutation };
