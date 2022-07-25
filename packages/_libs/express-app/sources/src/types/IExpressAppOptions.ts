import type http from 'http';

import type { CorsOptions } from 'cors';

export interface IExpressAppOptions {
    port: number;
    http2?: boolean;
    useCookieParser?: boolean;
    useCookieSession?: boolean;
    cors?: CorsOptions;
    staticFilesPath?: string;
    bodyParser?: {
        extended?: boolean;
        limit: number | string;
        inflate?: boolean;
        type?: string | string[] | ((req: http.IncomingMessage) => any);
        verify?(req: http.IncomingMessage, res: http.ServerResponse, buf: Buffer, encoding: string): void;
    };
}
