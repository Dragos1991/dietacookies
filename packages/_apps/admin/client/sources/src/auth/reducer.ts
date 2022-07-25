import type { AnyAction } from 'redux';

import type { AuthAllActions } from './actions';
import { AuthActionsTypes } from './actions';

const initialState: any = {
    currentUser: null,
    loading: true,
    errors: null,
};

export function authReducer(state = initialState, anyAction: AnyAction): any {
    const action = anyAction as AuthAllActions;
    switch (action.type) {
        case AuthActionsTypes.LoadCurrentUser:
            return {
                ...state,
                loading: true,
            };
        case AuthActionsTypes.LoadCurrentUserSuccess:
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
            };
        case AuthActionsTypes.Authenticate:
            return {
                ...state,
                loading: true,
            };
        case AuthActionsTypes.AuthenticateErrors:
            return {
                ...state,
                errors: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
