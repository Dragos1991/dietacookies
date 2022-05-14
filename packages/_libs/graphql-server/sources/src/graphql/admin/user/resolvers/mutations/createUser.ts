import { IAdminContext } from "../../../types/types";
import { IUser, IUserCreate } from "@dietacookies/data-access-layer";
import {
    InvalidRequestError,
    NotFoundError,
    TraceableError,
} from "@dietacookies/services-errors";

type ISource = unknown;
type IArgs = {
    data: IUserCreate;
};

const createUser = async (
    _source: ISource,
    args: IArgs,
    context: IAdminContext
): Promise<IUser> => {
    try {
        const { applicationContext } = context;
        const { userService } = applicationContext;
        const { data } = args;

        const user = await userService.create(data);

        return user;
    } catch (error) {
        throw new (
            error instanceof InvalidRequestError
                ? InvalidRequestError
                : error instanceof NotFoundError
                ? NotFoundError
                : TraceableError
        )("Create User Graphql", error, { args });
    }
};

export { createUser };
