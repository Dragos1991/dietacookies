import { Request, Response } from "express";
import { IUser } from "../user/types/types";

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

export interface IAdminApplicationContext {}
