import { graphQlClient } from "@dietacookies/client-libs";
import { takeEvery } from "redux-saga/effects";
import { AuthActionsTypes } from "../actions";

const query = `
query {
    currentUser{
        id,
        firstName,
        lastName,
        email,
        age,
        id,
        role,
        createdAt,
        updatedAt,
    }
}
`;

interface IAuthResponse {
    currentUser: any;
}

export function* authentitcate() {
    yield console.log("test");
    try {
        const response: IAuthResponse = yield graphQlClient.query({ query });

        console.log("data", response);
    } catch (error) {
        console.log("Authentification failed");
    }
}

export function* authenticateSaga() {
    yield takeEvery(AuthActionsTypes.LoadCurrentUser, authentitcate);
}
