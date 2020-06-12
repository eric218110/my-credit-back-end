import { Response, Request } from "express";

export class UserController {
  async getAll(request: Request, response: Response) {
    response.send("Boraa");
  }

  async save(request: Request, response: Response) {
    response.json(request.body);
  }
}
