import jwt from "jsonwebtoken";

import { IUser } from "@dietacookies/data-access-layer";
import { UnauthorizedError } from "@dietacookies/services-errors";

import { IAdminContext } from "../../../types/types";

const currentUser = async (
    _source: unknown,
    _args: unknown,
    context: IAdminContext
): Promise<IUser> => {
    try {
        const { req } = context;

        if (!req.session?.token) {
            throw new UnauthorizedError("Not authenticated.");
        }

        const user = jwt.verify(req.session?.token, "123") as IUser;

        return user;
    } catch (error) {
        throw error;
    }
};

export { currentUser };
