import { ExpressApp } from "@dietacookies/express-app";
import { ApplicationConfig } from "./ApplicationConfig";
import cookieParser from "cookie-parser";
import {
    ApolloServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
    GraphqlAdmin,
    IAdminApplicationContext,
} from "@dietacookies/graphql-server";

export class Application {
    public constructor(private readonly config: ApplicationConfig) {}

    public async start() {
        const service = new ExpressApp({
            port: this.config.port,
            cookieParser,
            cors: this.config.corsOptions,
        });

        this.addGraphqlRoute(service, {});

        await service.start();

        return service;
    }

    private async addGraphqlRoute(
        service: ExpressApp,
        applicationContext: IAdminApplicationContext
    ) {
        const schema = await GraphqlAdmin.createSchema();

        const graphqlServer = new ApolloServer({
            schema,
            context: ({ req, res }) => {
                const context = GraphqlAdmin.createContext({
                    req,
                    res,
                    applicationContext,
                });
                return context;
            },
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        });

        try {
            await graphqlServer.start();
        } catch (error) {
            console.log(error);
        }

        graphqlServer.applyMiddleware({
            app: service.app,
            cors: this.config.corsOptions,
            path: "/*_*/api",
        });
    }
}
