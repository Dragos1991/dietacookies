import path from 'path';

import { ExpressApp } from '@dietacookies/express-app';
import type { GraphQLError, IAdminApplicationContext } from '@dietacookies/graphql-server';
import {
    ApolloServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
    GraphqlAdmin,
    depthLimit,
} from '@dietacookies/graphql-server';
import type { Logger } from '@dietacookies/logger';
import { TraceableError } from '@dietacookies/traceable-error';

import type { ApplicationConfig } from './ApplicationConfig';
import { database } from './database/database';
import { Services } from './services/Services';

export class Application {
    public constructor(private readonly config: ApplicationConfig, private readonly log: Logger) {}

    public async start() {
        const log = this.log;
        const staticFilesPath = path.join(__dirname, '../../../client/dist/public');

        const service = new ExpressApp({
            port: this.config.port,
            useCookieParser: true,
            cors: this.config.corsOptions,
            useCookieSession: true,
            staticFilesPath,
        });

        const applicationServices = new Services(database, log).services;

        const applicationContext = {
            ...applicationServices,
        };

        this.addGraphqlRoute(service, applicationContext);

        await service.start();
        return service;
    }

    private async addGraphqlRoute(service: ExpressApp, applicationContext: IAdminApplicationContext) {
        const schema = await GraphqlAdmin.createSchema();
        const log = this.log;

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
            validationRules: [depthLimit(7)],

            formatError: (error: GraphQLError) => {
                log.error('Graphql Error', {
                    error,
                    orignalError: (error as any).orignalError,
                });

                return error;
            },
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        });

        try {
            await graphqlServer.start();
        } catch (error) {
            throw new TraceableError('Application.addGraphqlRoute', error);
        }

        graphqlServer.applyMiddleware({
            app: service.app,
            cors: this.config.corsOptions,
            path: '/*_*/api',
        });

        service.initSinglePageApp();
    }
}
