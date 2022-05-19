import { IAdminContext } from "../../../types/types";
import {
    IUserOmitPassword,
    IUserAuthenticate,
} from "@dietacookies/data-access-layer";

import jwt from "jsonwebtoken";

type ISource = unknown;
type IArgs = {
    data: IUserAuthenticate;
};

const authenticateUser = async (
    _sources: ISource,
    args: IArgs,
    context: IAdminContext
): Promise<IUserOmitPassword> => {
    try {
        const { applicationContext, req } = context;
        const { userService } = applicationContext;
        const { data } = args;

        const user = await userService.authenticate(data);

        const token = jwt.sign(user, "123");

        req.session = {
            token,
        };

        return user;
    } catch (error) {
        throw error;
    }
};

export { authenticateUser };
