import type { IUserAuthenticate, IUserOmitPassword } from '@dietacookies/data-access-layer';
import { sign } from 'jsonwebtoken';

import type { IAdminContext } from '../../../types/types';

type ISource = unknown;
type IArgs = {
    data: IUserAuthenticate;
};

const authenticateUser = async (_sources: ISource, args: IArgs, context: IAdminContext): Promise<IUserOmitPassword> => {
    try {
        const { applicationContext, res } = context;
        const { userService } = applicationContext;
        const { data } = args;
        const { rememberMe, ...rest } = data;

        const user = await userService.authenticate(rest);
        const token = sign(user, '123');
        const maxAge = rememberMe ? 24 * 60 * 60 * 1000 : undefined;

        res.cookie('token', token, {
            maxAge: maxAge,
            httpOnly: true,
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { authenticateUser };
