import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import connection from "../database";
import { Routes } from "../routes";
import * as bodyParser from "body-parser";

try {
  connection(); // CONNECTION WITH TYPEORM
  config(); // CONFIG ENVS

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
  });

  const { PORT_SERVER } = process.env || 3001;
  app.listen(PORT_SERVER);
  console.log("Server running in PORT: " + PORT_SERVER);
} catch (error) {
  console.log(error);
  console.error("Server not initial");
}
