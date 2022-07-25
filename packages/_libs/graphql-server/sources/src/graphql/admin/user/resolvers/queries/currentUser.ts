import jwt from 'jsonwebtoken';

import { IUser } from '@dietacookies/data-access-layer';

import { IAdminContext } from '../../../types/types';

const currentUser = async (_source: unknown, _args: unknown, context: IAdminContext): Promise<IUser | null> => {
    try {
        const { req } = context;

        if (!req.cookies.token) {
            return null;
        }

        const user = jwt.verify(req.cookies.token, '123') as IUser;

        return user;
    } catch (error) {
        throw error;
    }
};

export { currentUser };
