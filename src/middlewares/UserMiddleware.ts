import { Request, Response, NextFunction } from "express";
import { Validate } from "../common/Validate";

export class UserMiddleware {
  constructor() {}

  createUser(request: Request, response: Response, next: NextFunction) {
    try {
      const name: string = request.body.name;
      const email: string = request.body.email;
      const password: string = request.body.password;
      const confirm_password: string = request.body.confirm_password;

      Validate.isEmpty(
        [
          { field: name, fieldName: "name" },
          { field: email, fieldName: "email" },
          { field: password, fieldName: "password" },
          { field: confirm_password, fieldName: "confirm_password" },
        ],
        response
      );

      Validate.isEquals(
        { field: password, fieldName: "password" },
        confirm_password,
        response
      );

      Validate.isMinMax(
        { field: password, fieldName: "password" },
        { min: 8, max: 16 },
        response
      );

      Validate.isEmail({ field: email, fieldName: "email" }, response);

      next();
    } catch (error) {
      console.log(error);
      return response.status(401).json({
        error: "Erro request",
      });
    }
  }

  findOneUser(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    Validate.isEmpty([{ field: id, fieldName: "id" }], response);

    console.log(id);
    next();
  }
}
