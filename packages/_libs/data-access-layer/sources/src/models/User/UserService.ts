import {
    InvalidRequestError,
    NotFoundError,
    TraceableError,
} from "@dietacookies/services-errors";
import { IUser } from "../../database/user/IUser";
import { IUserCreate } from "../../database/user/IUser.Data";
import { IUuid } from "../../interfaces/IUuid";
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
        }
    ) {}

    public static factory(props: { userModel: UserModel }): UserService {
        return new UserService({
            userModel: props.userModel,
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

    public async create(request: IUserServiceCreateRequest): Promise<IUser> {
        const data = request;

        try {
            const user: IUser = await this.props.userModel.create(data);

            return user;
        } catch (error) {
            throw new (
                error instanceof InvalidRequestError
                    ? InvalidRequestError
                    : error instanceof NotFoundError
                    ? NotFoundError
                    : TraceableError
            )("Service Create", error, { request });
        }
    }
}
