import http from 'http';
import http2 from 'http2';
import path from 'path';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import type { Response } from 'express';
import express, { static as eStatic, json } from 'express';

import type { IExpressAppOptions } from './types/IExpressAppOptions';

export class ExpressApp {
    public app: express.Application;
    public webserver?: http.Server | http2.Http2Server;
    private options: IExpressAppOptions = {
        port: 8080,
        bodyParser: {
            limit: '50mb',
        },
    };

    public constructor(initOptions?: IExpressAppOptions) {
        this.app = express();
        this.options = { ...this.options, ...initOptions };

        if (this.options.staticFilesPath) {
            this.app.use(eStatic(this.options.staticFilesPath));
        }

        if (this.options.useCookieParser) {
            this.app.use(cookieParser());
        }
        if (this.options.cors) {
            this.app.use(cors(this.options.cors));
        }
        if (this.options.bodyParser) {
            this.app.use(json(this.options.bodyParser));
        }
    }

    public start(): http2.Http2Server | http.Server {
        const webserver = this.options.http2 ? http2.createServer(this.app) : http.createServer(this.app);

        webserver.listen(this.options.port, () => {
            console.log(`Listening on port ${this.options.port}`);
        });

        return (this.webserver = webserver);
    }

    public initSinglePageApp(): void {
        this.app.get('*', (_, res: Response) => {
            if (this.options.staticFilesPath) {
                res.sendFile(path.join(this.options.staticFilesPath, 'index.html'));
            }
        });
    }
}
