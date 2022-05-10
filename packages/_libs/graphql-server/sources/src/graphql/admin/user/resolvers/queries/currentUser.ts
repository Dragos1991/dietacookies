import { IAdminContext } from "../../../types/types";
import { IUser } from "../../types/types";

const currentUser = async (
    _source: unknown,
    _args: unknown,
    context: IAdminContext
): Promise<IUser | undefined> => {
    try {
        const { req } = context;
        const { currentUser } = req;

        return currentUser;
    } catch (error) {
        console.log(error);
        throw new Error("Error");
    }
};

export { currentUser };
