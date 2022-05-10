import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import http2 from "http2";
import { IExpressAppOptions } from "./types/IExpressAppOptions";

export class ExpressApp {
    public app: express.Application;
    public webserver?: http.Server | http2.Http2Server;
    private options: IExpressAppOptions = {
        port: 8080,
        bodyParser: {
            limit: "50mb",
        },
    };

    public constructor(initOptions?: IExpressAppOptions) {
        this.app = express();
        this.options = { ...this.options, ...initOptions };

        if (this.options.cookieParser) {
            this.app.use(cookieParser());
        }
        if (this.options.cors) {
            this.app.use(cors(this.options.cors));
        }
        if (this.options.bodyParser) {
            this.app.use(express.json(this.options.bodyParser));
        }
    }

    public start(): http2.Http2Server | http.Server {
        const webserver = this.options.http2
            ? http2.createServer(this.app)
            : http.createServer(this.app);

        webserver.listen(this.options.port, () => {
            console.log(`Listening on port ${this.options.port}`);
        });

        return (this.webserver = webserver);
    }
}