import { RequiredExecptFor } from "../../interfaces/IException";
import { IUser } from "./IUser";

type IUserCreateBase = Pick<
    IUser,
    | "id"
    | "email"
    | "firstName"
    | "lastName"
    | "age"
    | "password"
    | "role"
    | "createdAt"
    | "updatedAt"
>;

export type IUserCreate = RequiredExecptFor<
    IUserCreateBase,
    "id" | "createdAt" | "updatedAt" | "role"
>;

export type IUserAuthenticate = Pick<IUser, "email" | "password">;

export type IUserUpdate = Partial<
    Pick<IUser, "firstName" | "lastName" | "age" | "password" | "id">
>;

export type IUserOmitPassword = Omit<IUser, "password">;
