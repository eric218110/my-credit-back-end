import { Response, Request } from "express";
import { UserEntity } from "../../database/entitys/user.entity";
import { cardService } from "../../services/CardServices";
import { userService } from "../../services/UserServices";
import { authService } from "../../services/AuthService";
export class UserController {
  async index(request: Request, response: Response) {
    const { id } = request.params;
    const user = await userService.index({ id });
    return user === undefined
      ? response.status(401).json({ erro: "User not exists" })
      : response.json({
          user: { name: user.name, email: user.email, token: user.token },
        });
  }

  async create(request: Request, response: Response) {
    try {
      const user = new UserEntity();
      user.email = request.body.email;
      user.password = request.body.password;
      user.name = request.body.name;
      user.token = authService.generateToken(user.email);

      return response.json(await userService.create(user));
    } catch (error) {
      response.status(401).json({
        error: error.message,
        message: `Not create user`,
      });
    }
  }

  async createUserInFirebase(request: Request, response: Response) {
    try {
      const user = new UserEntity();
      user.email = request.body.email;
      user.password = request.body.password;
      user.name = request.body.name;

      return response.json(await userService.createUserInFirebase(user));
    } catch (error) {
      response.status(401).json({
        error: error.message,
        message: `Not create user`,
      });
    }
  }

  async createUserWithFacebook(user: UserEntity): Promise<UserEntity> {
    const { email } = user;
    const userExist = await userService.findByEmail({ email });

    if (!userExist) {
      return (await userService.create(user)) as UserEntity;
    } else {
      return userExist;
    }
  }

  async cards(request: Request, response: Response) {
    try {
      const { id } = request.params;

      return response.json(await userService.all());
    } catch (error) {
      console.log("Erro find cards from person");
    }
  }
}
