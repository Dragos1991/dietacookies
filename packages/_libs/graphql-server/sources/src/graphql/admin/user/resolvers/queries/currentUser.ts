import { IAdminContext } from "../../../types/types";
import { IUser } from "../../types/types";

const currentUser = async (
    _source: unknown,
    _args: { id: string },
    context: IAdminContext
): Promise<IUser | undefined> => {
    try {
        const { applicationContext } = context;

        const { userService } = applicationContext;
        const { id } = _args;

        const user = userService.load({ id });

        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Error");
    }
};

export { currentUser };
