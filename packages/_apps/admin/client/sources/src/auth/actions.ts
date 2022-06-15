import type { ActionsUnion } from "@dietacookies/client-libs";
import { createAction } from "@dietacookies/client-libs";

export enum AuthActionsTypes {
    LoadCurrentUser = "auth/LoadCurrentUser",
    LoadCurrentUserSuccess = "auth/LoadCurrentUserSucces",
}

export const AuthActions = {
    LoadCurrentUser: () => createAction(AuthActionsTypes.LoadCurrentUser),
    LoadCurrentUserSuccess: (currentUser: any) =>
        createAction(AuthActionsTypes.LoadCurrentUserSuccess, currentUser),
};

export type AuthAllActions = ActionsUnion<typeof AuthActions>;
