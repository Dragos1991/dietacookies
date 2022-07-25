import type { IUserCreate, IUserOmitPassword } from '@dietacookies/data-access-layer';
import { sign } from 'jsonwebtoken';

import type { IAdminContext } from '../../../types/types';

type ISource = unknown;
type IArgs = {
    data: IUserCreate;
};

const createUser = async (_source: ISource, args: IArgs, context: IAdminContext): Promise<IUserOmitPassword> => {
    try {
        const { applicationContext, res } = context;
        const { userService } = applicationContext;
        const { data } = args;

        const user = await userService.create(data);
        const token = sign(user, '123');

        res.cookie('token', token, {
            httpOnly: true,
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { createUser };
