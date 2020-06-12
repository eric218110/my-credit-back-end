import express, { Express, Request, Response } from "express";
import connection from "../database";
import { Routes } from "../routes";
import * as bodyParser from "body-parser";

try {
  connection();

  const app: Express = express();
  app.use(bodyParser.json());

  Routes.map((route) => {
    app[route.method](
      route.path,
      (request: Request, response: Response, next: Function) => {
        route
          .action(request, response)
          .then(() => next)
          .catch(() => next());
      }
    );
  });

  app.listen(1995);
} catch (error) {
  console.error("Server not initial");
}
