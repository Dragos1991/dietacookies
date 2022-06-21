import { IAdminContext } from "../../../types/types";
import {
    IUserOmitPassword,
    IUserCreate,
} from "@dietacookies/data-access-layer";

import jwt from "jsonwebtoken";

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
        const { applicationContext, res } = context;
        const { userService } = applicationContext;
        const { data } = args;

        const user = await userService.create(data);
        const token = jwt.sign(user, "123");

        res.cookie("token", token, {
            httpOnly: true,
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export { createUser };
