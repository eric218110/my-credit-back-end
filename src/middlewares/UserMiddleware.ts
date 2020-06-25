import { Request, Response, NextFunction } from "express";
import { Validate, IErrorValidator } from "../common/Validate";
import bcryptjs from "bcryptjs";
export class UserMiddleware {
  private errors: Array<IErrorValidator> = [];

  async createUser(request: Request, response: Response, next: NextFunction) {
    const errors: Array<IErrorValidator> = [];
    try {
      const name: string = request.body.name;
      const email: string = request.body.email;
      const password: string = request.body.password;
      const confirm_password: string = request.body.confirm_password;

      const isEquals = Validate.isEquals(
        { field: password, fieldName: "password" },
        confirm_password
      );
      if (isEquals !== true) {
        errors.push(isEquals);
      }

      const isMinMax = Validate.isMinMax(
        { field: password, fieldName: "password" },
        { min: 8, max: 16 }
      );
      if (isMinMax !== true) {
        errors.push(isMinMax);
      }

      const isEmail = Validate.isEmail({ field: email, fieldName: "email" });
      if (isEmail !== true) {
        errors.push(isEmail);
      }

      const isEmpty = Validate.isEmpty([
        { field: name, fieldName: "name" },
        { field: email, fieldName: "email" },
        { field: password, fieldName: "password" },
        { field: confirm_password, fieldName: "confirm_password" },
      ]);
      if (isEmpty !== true) {
        isEmpty.map((error: IErrorValidator) => errors.push(error));
      }

      if (errors.length > 0) {
        return response.json({ validationErros: errors });
      } else {
        // HASH PASSWORD
        const hash = await bcryptjs.hash(password, 10);

        request.body.password = hash;
        next();
      }
    } catch (error) {
      console.log(error);
      return response.status(401).json({
        error: "Erro request",
      });
    }
  }

  async createUserWithFacebook(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const errors: Array<IErrorValidator> = [];
    try {
      const name: string = request.body.name;
      const email: string = request.body.email;
      const password: string = `${name
        .trim()
        .replace(" ", "")
        .toLocaleLowerCase()}::${email}`;

      const isEmpty = Validate.isEmpty([
        { field: name, fieldName: "name" },
        { field: email, fieldName: "email" },
      ]);
      if (isEmpty !== true) {
        isEmpty.map((error: IErrorValidator) => errors.push(error));
      }

      const isEmail = Validate.isEmail({ field: email, fieldName: "email" });
      if (isEmail !== true) {
        errors.push(isEmail);
      }

      if (errors.length > 0) {
        return response.json({ validationErros: errors });
      } else {
        // HASH PASSWORD
        const hash = await bcryptjs.hash(password, 10);

        request.body.password = hash;
        next();
      }
    } catch (error) {
      console.log(error);
      return response.status(401).json({
        error: "Not create",
      });
    }
  }

  findOneUser(request: Request, response: Response, next: NextFunction) {
    const id: string = request.params.id;

    Validate.isEmpty([{ field: id, fieldName: "id" }]);

    next();
  }
}
