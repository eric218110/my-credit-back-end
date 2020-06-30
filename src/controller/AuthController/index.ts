import { Request, Response } from "express";
import { UserController } from "../UserController";
import { UserEntity } from "../../database/entitys/user.entity";
import { config } from "dotenv";
import JWT from "jsonwebtoken";

export class AuthController {
  constructor() {
    config();
  }

  // EMAIL, USER, PASSWORD = USER+EMAIL
  async authFacebook(request: Request, response: Response) {
    const userController = new UserController();
    const { JWT_TOKEN } = process.env;
    // CREATE USER WITH FACEBOOK
    const user = new UserEntity();
    user.email = request.body.email;
    user.password = request.body.password;
    user.name = request.body.name;
    user.photoURL = request.body.photoURL;

    const tokenJWT = JWT.sign({ uid: user.uid }, JWT_TOKEN!, {
      expiresIn: "7d",
    });

    user.token = tokenJWT;

    const userCreate = await userController.createUserWithFacebook(user);

    return response.json({
      id: user.id,
      email: userCreate.email,
      name: userCreate.name,
      photoURL: userCreate.photoURL,
      token: userCreate.token,
    });
  }
}
