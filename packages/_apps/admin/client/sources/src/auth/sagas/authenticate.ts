import { graphQlClient } from "@dietacookies/client-libs";
import { put, takeEvery } from "redux-saga/effects";
import { AuthActionsTypes, AuthActions } from "../actions";

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
    try {
        const response: IAuthResponse = yield graphQlClient.query({
            query,
        });

        yield put(AuthActions.LoadCurrentUserSuccess(response.currentUser));
    } catch (error) {
        console.log(error);
        console.log("Authentification failed");
    }
}

export function* authenticateSaga() {
    yield takeEvery(AuthActionsTypes.LoadCurrentUser, authentitcate);
}
