import { Request, Response } from "express";
import { IUser } from "../user/types/types";
import { IDatabase } from "@dietacookies/database-connector";
import { UserService } from "@dietacookies/data-access-layer";
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
