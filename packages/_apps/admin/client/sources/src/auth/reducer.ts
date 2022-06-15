import { AnyAction } from "redux";

const initialState: any = {
    currentUser: null,
};

export function authReducer(state = initialState, _anyAction: AnyAction): any {
    return state;
}
