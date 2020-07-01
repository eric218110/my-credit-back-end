import { Request, Response, NextFunction } from "express";
import { IErrorValidator, Validate } from "../../common/Validate";
import { config } from "dotenv";
import { authService } from "../../services/AuthService";
import JWT from "jsonwebtoken";

export class AuthMiddleware {
  constructor() {
    config();
  }

  private errors: Array<IErrorValidator> = [];

  async isAuthenticate(request: Request, response: Response, next: NextFunction) {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return response.status(401).json({ erro: "Not token provided" });
      }

      const parts = authHeader.split(" ");

      if (parts.length !== 2) {
        return response.status(401).json({ erro: "Token error" });
      }

      const [scheme, token] = parts;

      if (!/^Bearer$/i.test(scheme)) {
        return response.status(401).json({ erro: "Token malformatted" });
      }

      const { JWT_TOKEN } = process.env;

      JWT.verify(token, JWT_TOKEN!, (error, decoded) => {
        if (error) {
          return response.status(401).json({ erro: "Token invalid" });
        }
        const mydecoded: any = decoded;

        request.body.userId = mydecoded!.id;

        return next();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async signWithEmailAndPassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { email, password } = request.body;
    const errors: Array<IErrorValidator> = [];

    const isEmpty = Validate.isEmpty([
      { field: email, fieldName: "Email" },
      { field: password, fieldName: "Password" },
    ]);

    if (isEmpty !== true) {
      isEmpty.map((error: IErrorValidator) => errors.push(error));
    }

    if (errors.length > 0) {
      return response.json({ validationErros: errors });
    } else {
      next();
    }
  }
}
