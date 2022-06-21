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
        const { applicationContext, res } = context;
        const { userService } = applicationContext;
        const { data } = args;
        const { rememberMe, ...rest } = data;

        const user = await userService.authenticate(rest);

        const token = jwt.sign(user, "123");

        console.log(rememberMe);

        const maxAge = rememberMe ? 24 * 60 * 60 * 1000 : undefined;

        res.cookie("token", token, {
            maxAge: maxAge,
            httpOnly: true,
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export { authenticateUser };
