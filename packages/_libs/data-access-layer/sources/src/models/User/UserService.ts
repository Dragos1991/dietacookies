import {
    IDatabase,
    PostgresqlDatabase,
} from "@dietacookies/database-connector";
import {
    InvalidRequestError,
    NotFoundError,
    TraceableError,
} from "@dietacookies/services-errors";
import { UserModel } from "./UserModel";

interface IRequestParams {
    id: string;
}

export type IUserServiceRequest = IRequestParams;
export type IUserServiceResponse = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    password: string;
    email: string;
};

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

    public async load(
        request: IUserServiceRequest
    ): Promise<IUserServiceResponse> {
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
}
