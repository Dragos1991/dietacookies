import { RequiredExecptFor } from '../../interfaces/IException';
import { IUser } from './IUser';

type IUserCreateBase = Pick<
    IUser,
    'id' | 'email' | 'firstName' | 'lastName' | 'age' | 'password' | 'role' | 'createdAt' | 'updatedAt'
>;

export type IUserCreate = RequiredExecptFor<IUserCreateBase, 'id' | 'createdAt' | 'updatedAt' | 'role'>;

export type IUserAuthenticateDB = Pick<IUser, 'email' | 'password'>;
export type IUserAuthenticate = IUserAuthenticateDB & {
    rememberMe?: boolean;
};

export type IUserUpdate = Partial<Pick<IUser, 'firstName' | 'lastName' | 'age' | 'password'>>;

export type IUserDelete = Pick<IUser, 'id'>;

export type IUserOmitPassword = Omit<IUser, 'password'>;
