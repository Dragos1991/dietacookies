import { IAdminContext } from "../../../types/types";

type ISource = unknown;
type IArgs = unknown;

const logOut = async (
    _source: ISource,
    _args: IArgs,
    context: IAdminContext
): Promise<{ isDone: boolean }> => {
    try {
        const { res } = context;

        res.clearCookie("jwt");

        return {
            isDone: true,
        };
    } catch (error) {
        console.log(error);
        throw new Error("error");
    }
};

export { logOut };
