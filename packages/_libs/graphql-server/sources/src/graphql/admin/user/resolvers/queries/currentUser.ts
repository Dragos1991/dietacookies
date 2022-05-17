import { IUser } from "@dietacookies/data-access-layer";
import { IAdminContext } from "../../../types/types";
import jwt from "jsonwebtoken";

const currentUser = async (
    _source: unknown,
    _args: unknown,
    context: IAdminContext
): Promise<IUser> => {
    try {
        const { req } = context;

        const user = jwt.verify(req.session?.token, "123") as IUser;

        return user;
    } catch (error) {
        throw error;
    }
};

export { currentUser };
