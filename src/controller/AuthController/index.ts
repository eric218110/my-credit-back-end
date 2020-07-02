import { Request, Response } from "express";
import { UserController } from "../UserController";
import { UserEntity } from "../../database/entitys/user.entity";
import { authService } from "../../services/AuthService";
import { userService } from "../../services/UserServices";
import { compare } from "bcryptjs";

export class AuthController {
  async authFacebook(request: Request, response: Response) {
    const userController = new UserController();
    // CREATE USER WITH FACEBOOK
    const user = new UserEntity();
    user.email = request.body.email;
    user.password = request.body.password;
    user.name = request.body.name;
    user.photoURL = request.body.photoURL;
    user.token = authService.generateToken(user.email);

    const userCreate = await userController.createUserWithFacebook(user);

    return response.json({
      user: {
        id: userCreate.id,
        email: userCreate.email,
        name: userCreate.name,
        photoURL: userCreate.photoURL,
        token: userCreate.token,
      },
    });
  }

  async authEmailAndPassword(request: Request, response: Response) {
    try {
      const user = await userService.findWithEmail(request.body.email);

      if (user === undefined) {
        response.status(401).json({ error: "User not exist" });
      } else {
        if (!(await compare(request.body.password, user.password))) {
          response.status(401).json({ error: "Password invalid" });
        }
        return response.status(401).json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            token: user.token,
            photoURL: user.photoURL,
          },
        });
      }
    } catch (error) {
      response.status(401).json({ error: "Not authenticate" });
    }
  }
}
