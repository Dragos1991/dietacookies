import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        register(data: UserData!): User!
        update(where: WhereUserId!, data: UserData!): User!
        logIn(data: LogInData!): User!
        logOut: LogOutUserCompleted!
    }
`;

export { mutation };
