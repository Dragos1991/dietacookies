import { IAdminContext } from '../../../types/types';
import { IUser, IUserDelete, IUserOmitPassword } from '@dietacookies/data-access-layer';

import jwt from 'jsonwebtoken';

type ISource = unknown;
type IArgs = {
    data: IUserDelete;
};

const deleteUser = async (_source: ISource, args: IArgs, context: IAdminContext): Promise<IUserOmitPassword | null> => {
    try {
        const { applicationContext, req, res } = context;
        const { userService } = applicationContext;
        const { data } = args;

        const { id } = jwt.verify(req.cookies.token, '123') as IUser;

        const user = await userService.delete({ data, where: { id } });

        if (id === data.id) {
            res.clearCookie('token');
        }

        return user;
    } catch (error) {
        throw error;
    }
};

export { deleteUser };
