import { InvalidRequestError } from "@dietacookies/services-errors";
import { Logger } from "@dietacookies/logger";
import {
    IUserOmitPassword,
    IUserCreate,
    IUser,
    IUserUpdate,
    IUserAuthenticate,
} from "../../database";
import { IUuid } from "../../interfaces/IUuid";
import { Validator, ValidationSchema } from "../../validation/Validator";
import { UserModel } from "./UserModel";
import { HandlePassword } from "../../services";

export interface IUserServiceCreateRequest extends IUserCreate {}
export interface IUserUpdateRequest extends IUserUpdate {}
export interface IUserAuthenticateRequest extends IUserAuthenticate {}

export class UserService {
    public constructor(
        protected props: {
            userModel: UserModel;
            validator: Validator;
            log: Logger;
        }
    ) {}

    public static factory(props: {
        userModel: UserModel;
        validator: Validator;
        log: Logger;
    }): UserService {
        return new UserService({
            userModel: props.userModel,
            validator: props.validator,
            log: props.log,
        });
    }

    public async loadById(id: IUuid): Promise<IUser> {
        if (!id) {
            throw new InvalidRequestError("Missing id");
        }
        try {
            const user = await this.props.userModel.loadById(id);

            return user;
        } catch (error) {
            throw error;
        }
    }

    public async loadByEmail(email: string): Promise<IUser> {
        if (!email) {
            throw new InvalidRequestError("Missing email");
        }
        try {
            const user = await this.props.userModel.loadByEmail(email);

            return user;
        } catch (error) {
            throw error;
        }
    }

    public async create(
        request: IUserServiceCreateRequest
    ): Promise<IUserOmitPassword> {
        const data = request;

        try {
            const validation = this.props.validator.validate(
                data,
                ValidationSchema.UserCreate
            );

            if (!validation.isValid) {
                throw new InvalidRequestError("Create validation error", {
                    errors: validation.errors,
                    data,
                });
            }

            const existingUser = await this.loadByEmail(data.email);

            if (existingUser) {
                throw new InvalidRequestError("Email already in use.", {
                    fields: ["email"],
                });
            }

            const securePassword = await HandlePassword.toHash(data.password);

            const user: IUserOmitPassword = await this.props.userModel.create({
                ...data,
                password: securePassword,
            });

            return user;
        } catch (error) {
            throw error;
        }
    }

    public async authenticate(
        request: IUserAuthenticate
    ): Promise<IUserOmitPassword> {
        const data = request;
        try {
            const validation = this.props.validator.validate(
                data,
                ValidationSchema.UserAuthenticate
            );

            if (!validation.isValid) {
                throw new InvalidRequestError("Authenticate validation error", {
                    errors: validation.errors,
                    data,
                });
            }

            const user = await this.loadByEmail(data.email);

            if (!user) {
                throw new InvalidRequestError("Invalid credentials.");
            }

            const { password } = user;
            const passwordsMatch = await HandlePassword.compare(
                password,
                data.password
            );

            if (!passwordsMatch) {
                throw new InvalidRequestError("Invalid credentials.");
            }

            return user;
        } catch (error) {
            throw error;
        }
    }
}
