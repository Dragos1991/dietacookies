import { IUuid } from "../../interfaces/IUuid";
import { IUserRoles } from "./IUserRoles";

interface IUserBase {
    id: IUuid;
    age?: number;
    password: string;
    email: string;
    role: IUserRoles;
}

export interface IUser extends IUserBase {
    firstName: string;
    lastName: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface IUserDb extends IUserBase {
    first_name: string;
    last_name: string;
    created_at: Date | null;
    updated_at: Date | null;
}

export type ILoadUserBy = Pick<IUser, "id"> | Pick<IUser, "email">;
