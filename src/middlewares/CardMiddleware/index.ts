import { Response, Request, NextFunction } from "express";
import { Validate, IErrorValidator } from "../../common/Validate";

export class CardMiddleware {
  create(request: Request, response: Response, next: NextFunction) {
    const errors: Array<IErrorValidator> = [];
    try {
      const name: string = request.body.name;
      const number: string = request.body.number;
      const holderName: string = request.body.holderName;
      const flag: string = request.body.flag;
      const balance: string = request.body.flag;
      const backgroundColor: string = request.body.backgroundColor;

      const isEmpty = Validate.isEmpty([
        { field: name, fieldName: "Name" },
        { field: number, fieldName: "Number" },
        { field: holderName, fieldName: "Holder name" },
        { field: flag, fieldName: "Flag" },
        { field: balance, fieldName: "Balance" },
      ]);
      if (isEmpty !== true) {
        isEmpty.map((error: IErrorValidator) => errors.push(error));
      }

      if (errors.length > 0) {
        return response.json({ validationErros: errors });
      } else {
        next();
      }
    } catch (error) {
      console.log("Erro: " + error);
    }
  }
}
