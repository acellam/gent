import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import * as http from "http";
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';

import database from "./config/database";
import winston, { logger } from "./config/winston";
import typeDefs from "./graphql/schema/index";
import rootResolver from "./graphql/resolvers";

export class App {
    public express!: express.Application;
    public session!: express.RequestHandler;
    public httpServer!: http.Server;
    public server!: ApolloServer;
    constructor() {
        try {
            this.server = new ApolloServer(this.getAppoloConfig());
            this.express = express();
            this.setUp();
            database.start();
            // this.api.routes(this);
        } catch (error) {
            logger.log("error", `App: Some weirdo error happened :( ", ${error}`);
        }
    }

    private getAppoloConfig= (): ApolloServerExpressConfig => {
        return {
            typeDefs,
            resolvers: rootResolver,
            introspection: true,
            context: async ({req, connection, payload}: any) => {
                if (connection) {
                    return {isAuth: payload.authToken};
                }
                return {isAuth: req.isAuth};
            },
            playground: true
        };
    }

    private setUp = ()=> {
        // make sure that the environment is set
        dotenv.config();
        // support application/json type post data
        this.express.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // so we can get the client's IP address
        this.express.enable("trust proxy");
        // set up logging
        this.express.use(morgan("combined", { stream: winston.stream } as any));
        this.server.applyMiddleware({ app: this.express });
        this.httpServer = http.createServer(this.express);
        // Install subscription handlers
        this.server.installSubscriptionHandlers(this.httpServer);
    }
}

export default new App();
