import { IUser, IUuid } from "@dietacookies/data-access-layer";
import {
    InvalidRequestError,
    NotFoundError,
    TraceableError,
} from "@dietacookies/services-errors";
import { IAdminContext } from "../../../types/types";

const currentUser = async (
    _source: unknown,
    args: { id: IUuid },
    context: IAdminContext
): Promise<IUser> => {
    try {
        const { applicationContext } = context;
        const { userService } = applicationContext;
        const { id } = args;

        const user = userService.load({ id });

        return user;
    } catch (error) {
        throw new (
            error instanceof InvalidRequestError
                ? InvalidRequestError
                : error instanceof NotFoundError
                ? NotFoundError
                : TraceableError
        )("Load User Graphql", error, { args });
    }
};

export { currentUser };
