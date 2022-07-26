import { verify } from 'jsonwebtoken';

import type { IUser } from '@dietacookies/data-access-layer';

import type { IAdminContext } from '../../../types/types';

const currentUser = async (_source: unknown, _args: unknown, context: IAdminContext): Promise<IUser | null> => {
    try {
        const { req } = context;

        if (!req.cookies.token) {
            return null;
        }

        const user = verify(req.cookies.token, '123') as IUser;

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { currentUser };
