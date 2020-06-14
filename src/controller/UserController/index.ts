import { Response, Request } from "express";
import { userService } from "../../services/UserServices";
import { UserEntity } from "../../database/entitys/user.entity";
export class UserController {
  async index(request: Request, response: Response) {
    console.log(request.params.id);
    response.send("Boraa");
  }

  async create(request: Request, response: Response) {
    try {
      const user = new UserEntity();
      user.email = request.body.email;
      user.password = request.body.password;
      user.name = request.body.name;

      return response.json(await userService.create(user));
    } catch (error) {
      response.status(401).json({
        error: error.message,
        message: `Not create user`,
      });
    }
  }
}
