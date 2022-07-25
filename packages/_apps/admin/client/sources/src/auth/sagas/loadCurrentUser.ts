import { graphQlClient } from '@dietacookies/client-libs';
import { put, takeEvery } from 'redux-saga/effects';
import { AuthActionsTypes, AuthActions } from '../actions';

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
    data: {
        currentUser: any;
    };
}

export function* loadCurrentUser() {
    try {
        const response: IAuthResponse = yield graphQlClient.query({
            query,
        });

        yield put(AuthActions.LoadCurrentUserSuccess(response.data.currentUser));
    } catch (error) {
        console.log(error);
        console.log('Authentification failed');
    }
}

export function* loadCurrentUserSaga() {
    yield takeEvery(AuthActionsTypes.LoadCurrentUser, loadCurrentUser);
}
