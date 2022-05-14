import { IAdminContext } from "../../../types/types";
import {
    IUserOmitPassword,
    IUserCreate,
} from "@dietacookies/data-access-layer";
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
): Promise<IUserOmitPassword> => {
    try {
        const { applicationContext } = context;
        const { userService } = applicationContext;
        const { data } = args;

        const user = await userService.create(data);

        return user;
    } catch (error) {
        throw error;
    }
};

export { createUser };
