import type { Request, Response } from 'express';

import type { IUser, UserService } from '@dietacookies/data-access-layer';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            currentUser?: IUser;
        }
    }
}

export interface IAdminContext {
    req: Request;
    res: Response;
    applicationContext: IAdminApplicationContext;
}

export interface IAdminApplicationContext {
    userService: UserService;
}
