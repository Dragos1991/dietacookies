import { AnyAction } from "redux";
import { AuthActionsTypes, AuthAllActions } from "./actions";

const initialState: any = {
    currentUser: null,
    loading: true,
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
        default:
            return state;
    }
}
