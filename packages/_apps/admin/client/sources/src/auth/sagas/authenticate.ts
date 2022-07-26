import { put, takeEvery } from 'redux-saga/effects';

import { graphQlClient } from '@dietacookies/client-libs';

import { AuthActions, AuthActionsTypes } from '../actions';

const query = `
mutation AuthenticateUser($data: UserAuthenticateInput!) {
    authenticateUser(data: $data) {
      id,
        firstName
        lastName,
        email,
        role,
        createdAt,
        updatedAt
    }}
`;

interface IAuthResponse {
    data: {
        authenticateUser: any;
    };
    errors?: Record<any, any>[];
}

export function* authenticate(action: ReturnType<typeof AuthActions.Authenticate>) {
    try {
        const response: IAuthResponse = yield graphQlClient.query({
            query,
            variables: {
                data: action.payload,
            },
        });

        if (!response.data) {
            yield put(AuthActions.AuthenticateErrors(response.errors));
        } else {
            yield put(AuthActions.LoadCurrentUserSuccess(response.data.authenticateUser));
        }
    } catch (error) {
        console.log(error);
    }
}

export function* authenticateSaga() {
    yield takeEvery(AuthActionsTypes.Authenticate, authenticate);
}
