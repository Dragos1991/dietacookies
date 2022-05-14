import {
    InvalidRequestError,
    NotFoundError,
    TraceableError,
} from "@dietacookies/services-errors";
import { Logger } from "@dietacookies/logger";
import { IUserOmitPassword, IUserCreate, IUser } from "../../database";
import { IUuid } from "../../interfaces/IUuid";
import { Validator, ValidationSchema } from "../../validation/Validator";
import { UserModel } from "./UserModel";

interface IRequestParams {
    id: IUuid;
}

export interface IUserServiceRequest extends IRequestParams {}
export interface IUserServiceCreateRequest extends IUserCreate {}

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

    public async load(request: IUserServiceRequest): Promise<IUser> {
        const { id } = request;
        if (!id) {
            throw new InvalidRequestError("Missing id");
        }

        try {
            return await this.props.userModel.load(id);
        } catch (error) {
            throw new (
                error instanceof InvalidRequestError
                    ? InvalidRequestError
                    : error instanceof NotFoundError
                    ? NotFoundError
                    : TraceableError
            )("Service Load", error, { request });
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
                throw new InvalidRequestError("Validation Error", {
                    errors: validation.errors,
                    data,
                });
            }

            const user: IUserOmitPassword = await this.props.userModel.create(
                data
            );

            return user;
        } catch (error) {
            throw error;
        }
    }
}
