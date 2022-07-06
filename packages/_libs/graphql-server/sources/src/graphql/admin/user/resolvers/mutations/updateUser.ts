import { IAdminContext } from "../../../types/types";
import {
    IUser,
    IUserOmitPassword,
    IUserUpdate,
} from "@dietacookies/data-access-layer";

import jwt from "jsonwebtoken";
import { InvalidRequestError } from "@dietacookies/services-errors";

type ISource = unknown;
type IArgs = {
    data: IUserUpdate;
};

const updateUser = async (
    _source: ISource,
    args: IArgs,
    context: IAdminContext
): Promise<IUserOmitPassword> => {
    try {
        const { applicationContext, res, req } = context;
        const { userService } = applicationContext;

        const { data } = args;

        const currentUser = jwt.verify(req.cookies.token, "123") as IUser;

        const user = await userService.update({ data, where: { currentUser } });

        const token = jwt.sign(user, "123");

        res.cookie("token", token, {
            httpOnly: true,
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export { updateUser };
