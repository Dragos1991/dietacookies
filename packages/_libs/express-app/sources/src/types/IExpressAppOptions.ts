import type { CorsOptions } from "cors";
import type cookieParser from "cookie-parser";
import type http from "http";

export interface IExpressAppOptions {
    port: number;
    http2?: boolean;
    useCookieParser?: boolean;
    useCookieSession?: boolean;
    cors?: CorsOptions;
    bodyParser?: {
        extended?: boolean;
        limit: number | string;
        inflate?: boolean;
        type?: string | string[] | ((req: http.IncomingMessage) => any);
        verify?(
            req: http.IncomingMessage,
            res: http.ServerResponse,
            buf: Buffer,
            encoding: string
        ): void;
    };
}
