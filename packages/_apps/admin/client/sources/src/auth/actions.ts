import type { ActionsUnion } from "@dietacookies/client-libs";
import { createAction } from "@dietacookies/client-libs";

export enum AuthActionsTypes {
    LoadCurrentUser = "auth/LoadCurrentUser",
}

export const AuthActions = {
    LoadCurrentUser: () => createAction(AuthActionsTypes.LoadCurrentUser),
};

export type AuthAllActions = ActionsUnion<typeof AuthActions>;
