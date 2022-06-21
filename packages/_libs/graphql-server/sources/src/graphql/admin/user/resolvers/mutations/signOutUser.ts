import { InvalidRequestError } from "@dietacookies/services-errors";
import { IAdminContext } from "../../../types/types";

type ISource = unknown;
type IArgs = unknown;

const signOutUser = async (
    _sources: ISource,
    _args: IArgs,
    context: IAdminContext
): Promise<{ success: boolean }> => {
    try {
        const { res } = context;

        res.clearCookie("token");

        return { success: true };
    } catch (error) {
        throw new InvalidRequestError("Sign out not possible.");
    }
};

export { signOutUser };
