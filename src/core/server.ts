import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import { Routes } from "../routes";
import connection from "../database";
import chalk from "chalk";
import * as bodyParser from "body-parser";
import cors from "cors";

export class Server {
  static bootstrap() {
    const { log } = console;

    try {
      connection(); // CONNECTION WITH TYPEORM
      config(); // CONFIG ENVS
      log(chalk.green(`STORAGE - Database init`));

      const app: Express = express();

      app.use(bodyParser.json());
      app.use(
        cors({
          allowedHeaders: "Access-Control-Allow-Headers",
          methods: "Access-Control-Allow-Methods",
        })
      );
      // ROUTES APP, MIDDLEWARES
      Routes.map((route) => {
        app[route.method](
          route.path,
          route.middlewares !== undefined
            ? (request: Request, response: Response, next: Function) => {
                if (route.middlewares !== undefined) {
                  route.middlewares.map((middleware) => {
                    middleware(request, response, next);
                  });
                }
              }
            : (request: Request, response: Response, next: Function) => next(),
          (request: Request, response: Response, next: Function) => {
            route
              .action(request, response)
              .then(() => next)
              .catch(() => next());
          }
        );
        log(
          chalk.green(
            `ROUTER  - Router(${
              route.path
            }) | Method: ${route.method.toUpperCase()}`
          )
        );
      });

      const { PORT_SERVER } = process.env || 3001;
      app.listen(PORT_SERVER);
      log(chalk.green(`SERVER  - Server running in port ${PORT_SERVER}`));
    } catch (error) {
      log(chalk.red(error));
      log(chalk.red("Server not initial"));
    }
  }
}
