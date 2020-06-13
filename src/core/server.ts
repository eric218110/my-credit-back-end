import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import connection from "../database";
import { Routes } from "../routes";
import * as bodyParser from "body-parser";
import chalk from "chalk";

export class Server {
  static bootstrap() {
    try {
      const { log } = console;
      connection(); // CONNECTION WITH TYPEORM
      config(); // CONFIG ENVS
      log(chalk.green(`STORAGE - Database init`));

      const app: Express = express();

      app.use(bodyParser.json());

      // ROUTES APP, MIDDLEWARES
      Routes.map((route) => {
        app[route.method](
          route.path,
          route.middleawre !== undefined
            ? (request: Request, response: Response, next: Function) => {
                if (route.middleawre !== undefined) {
                  route.middleawre(request, response, next);
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
      console.log(error);
      console.error("Server not initial");
    }
  }
}
