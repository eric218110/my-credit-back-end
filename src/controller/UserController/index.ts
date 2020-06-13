import { Response, Request } from "express";
import { UserEntity } from "../../database/entitys/user.entity";
export class UserController {
  async getAll(request: Request, response: Response) {
    response.send("Boraa");
  }

  async create(request: Request, response: Response) {
    return response.json(request.body);
  }
}
