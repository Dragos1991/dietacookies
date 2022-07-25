import { Request, Response } from 'express';
import { IUser } from '@dietacookies/data-access-layer';
import { UserService } from '@dietacookies/data-access-layer';
declare global {
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
