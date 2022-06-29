import type { ActionsUnion } from "@dietacookies/client-libs";
import { createAction } from "@dietacookies/client-libs";

export enum AuthActionsTypes {
    LoadCurrentUser = "auth/LoadCurrentUser",
    LoadCurrentUserSuccess = "auth/LoadCurrentUserSucces",
    Authenticate = "auth/Authenticate",
    AuthenticateErrors = "auth/AuthenticateErrors",
}

export const AuthActions = {
    LoadCurrentUser: () => createAction(AuthActionsTypes.LoadCurrentUser),
    LoadCurrentUserSuccess: (currentUser: any) =>
        createAction(AuthActionsTypes.LoadCurrentUserSuccess, currentUser),
    Authenticate: (authValues: {
        email: string;
        password: string;
        remeberMe: boolean;
    }) => createAction(AuthActionsTypes.Authenticate, authValues),
    AuthenticateErrors: (errors: any) =>
        createAction(AuthActionsTypes.AuthenticateErrors, errors),
};

export type AuthAllActions = ActionsUnion<typeof AuthActions>;
