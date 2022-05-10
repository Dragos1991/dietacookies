import { IAdminContext } from "../../../types/types";
import { IUser } from "../../types/types";

type ISource = unknown;
type IArgs = unknown;

const register = async (
    _source: ISource,
    _args: IArgs,
    context: IAdminContext
): Promise<IUser> => {
    try {
        const { res } = context;

        return {
            id: "122312312",
            firstName: "Dragos",
            lastName: "Nitescu",
            age: 31,
            email: "dragos@test.com",
        };
    } catch (error) {
        console.log(error);
        throw new Error("error");
    }
};

export { register };
