import type { Logger } from '@dietacookies/logger';
import { InvalidRequestError } from '@dietacookies/services-errors';
import _ from 'lodash';

import type {
    IUser,
    IUserAuthenticate,
    IUserCreate,
    IUserDelete,
    IUserOmitPassword,
    IUserUpdate,
} from '../../database';
import type { IUuid } from '../../interfaces/IUuid';
import { HandlePassword } from '../../services';
import type { Validator } from '../../validation/Validator';
import { ValidationSchema } from '../../validation/Validator';
import type { UserModel } from './UserModel';

export type IUserServiceCreateRequest = IUserCreate;
export interface IUserUpdateRequest {
    data: IUserUpdate;
    where: {
        currentUser: IUser;
    };
}

export interface IUserDeleteRequest {
    data: IUserDelete;
    where: {
        id: IUuid;
    };
}
export type IUserAuthenticateRequest = IUserAuthenticate;

export class UserService {
    public constructor(
        protected props: {
            userModel: UserModel;
            validator: Validator;
            log: Logger;
        },
    ) {}

    public static factory(props: { userModel: UserModel; validator: Validator; log: Logger }): UserService {
        return new UserService({
            userModel: props.userModel,
            validator: props.validator,
            log: props.log,
        });
    }

    public async loadById(id: IUuid): Promise<IUser> {
        if (!id) {
            throw new InvalidRequestError('Missing id');
        }
        try {
            const user = await this.props.userModel.loadById(id);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async loadByEmail(email: string): Promise<IUser> {
        if (!email) {
            throw new InvalidRequestError('Missing email');
        }
        try {
            const user = await this.props.userModel.loadByEmail(email);

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async create(request: IUserServiceCreateRequest): Promise<IUserOmitPassword> {
        const data = request;

        try {
            const validation = this.props.validator.validate(data, ValidationSchema.UserCreate);

            if (!validation.isValid) {
                throw new InvalidRequestError('Create validation error', {
                    errors: validation.errors,
                    data,
                });
            }

            const existingUser = await this.loadByEmail(data.email);

            if (existingUser) {
                throw new InvalidRequestError('Email already in use.', {
                    fields: ['email'],
                });
            }

            const securePassword = await HandlePassword.toHash(data.password);

            const user: IUserOmitPassword = await this.props.userModel.create({
                ...data,
                password: securePassword,
            });

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async update(request: IUserUpdateRequest): Promise<IUserOmitPassword> {
        const {
            data,
            where: { currentUser },
        } = request;

        try {
            if (!currentUser.id) {
                throw new InvalidRequestError('Missing ID');
            }

            if (_.difference(Object.values(data), Object.values(currentUser)).length === 0) {
                throw new InvalidRequestError('Same user data.');
            }

            let securePassword: string | undefined = undefined;

            if (data.password) {
                securePassword = await HandlePassword.toHash(data.password);
            }

            const user: IUserOmitPassword = await this.props.userModel.update(
                {
                    ...data,
                    ...(securePassword && { password: securePassword }),
                },
                currentUser.id,
            );

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async delete(request: IUserDeleteRequest): Promise<IUserOmitPassword> {
        const {
            data,
            where: { id },
        } = request;

        try {
            if (!id) {
                throw new InvalidRequestError('Missing ID');
            }

            const masterUser = await this.loadById(id);

            if ((masterUser && masterUser.role !== 'admin') || id !== data.id) {
                throw new InvalidRequestError('Unathorized.', {
                    id,
                });
            }

            const deletingUser = await this.loadById(data.id);

            if (!deletingUser) {
                throw new InvalidRequestError('User dose not exist.', {
                    id: data.id,
                });
            }

            const user: IUserOmitPassword = await this.props.userModel.delete(data.id);

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async authenticate(request: IUserAuthenticate): Promise<IUserOmitPassword> {
        const data = request;
        try {
            const validation = this.props.validator.validate(data, ValidationSchema.UserAuthenticate);

            if (!validation.isValid) {
                throw new InvalidRequestError('Authenticate validation error', {
                    errors: validation.errors,
                    data,
                });
            }

            const user = await this.loadByEmail(data.email);

            if (!user) {
                throw new InvalidRequestError('Invalid credentials.');
            }

            const { password } = user;
            const passwordsMatch = await HandlePassword.compare(password, data.password);

            if (!passwordsMatch) {
                throw new InvalidRequestError('Invalid credentials.');
            }

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
