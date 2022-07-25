import type { IUser, IUserOmitPassword, IUserUpdate } from '@dietacookies/data-access-layer';
import jwt from 'jsonwebtoken';

import type { IAdminContext } from '../../../types/types';

type ISource = unknown;
type IArgs = {
    data: IUserUpdate;
};

const updateUser = async (_source: ISource, args: IArgs, context: IAdminContext): Promise<IUserOmitPassword> => {
    try {
        const { applicationContext, res, req } = context;
        const { userService } = applicationContext;

        const { data } = args;

        const currentUser = jwt.verify(req.cookies.token, '123') as IUser;

        const user = await userService.update({ data, where: { currentUser } });

        const token = jwt.sign(user, '123');

        res.cookie('token', token, {
            httpOnly: true,
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { updateUser };
