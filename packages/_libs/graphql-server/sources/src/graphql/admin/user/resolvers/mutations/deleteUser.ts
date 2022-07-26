import { verify } from 'jsonwebtoken';

import type { IUser, IUserDelete, IUserOmitPassword } from '@dietacookies/data-access-layer';

import type { IAdminContext } from '../../../types/types';

type ISource = unknown;
type IArgs = {
    data: IUserDelete;
};

const deleteUser = async (_source: ISource, args: IArgs, context: IAdminContext): Promise<IUserOmitPassword | null> => {
    try {
        const { applicationContext, req, res } = context;
        const { userService } = applicationContext;
        const { data } = args;

        const { id } = verify(req.cookies.token, '123') as IUser;

        const user = await userService.delete({ data, where: { id } });

        if (id === data.id) {
            res.clearCookie('token');
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { deleteUser };
