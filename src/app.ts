import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import * as http from "http";
import * as expressJwt from "express-jwt";
import { graphqlHTTP } from "express-graphql";

import database from "./config/database";
import winston, { logger } from "./config/winston";
import schema from "./graphql/schema";
import rootValue from "./graphql/resolvers";

export class App {
    public express!: express.Application;
    public session!: express.RequestHandler;
    public httpServer!: http.Server;

    constructor() {
        try {
            this.setUp();
            database.start();
            // this.api.routes(this);
        } catch (error) {
            logger.log("error", `App: Some weirdo error happened :( ", ${error}`);
        }
    }

    private setUp = () => {
        this.express = express();
        // make sure that the environment is set
        dotenv.config();
        // support application/json type post data
        this.express.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // so we can get the client's IP address
        this.express.enable("trust proxy");
        // set up authentication
        this.express.use(this.auth());
        // set up graphql
        this.express.use(
            "/graphql",
            graphqlHTTP(async (request: any, _response, _graphQLParams) => ({
                schema,
                rootValue,
                graphiql: true,
                context: {
                    user: request.user
                }
            }))
        );
        // set up logging
        this.express.use(morgan("combined", { stream: winston.stream } as any));
        this.httpServer = http.createServer(this.express);
    }

    private auth() {
        return expressJwt({
            secret: String(process.env.JWT_SECRET),
            algorithms: [ "HS256" ],
            credentialsRequired: false
        });
    }
}

export default new App();
