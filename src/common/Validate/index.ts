import { Response } from "express";

interface IErro {
  message: string;
  fieldName: string;
  validation?: string;
}

interface IFielder {
  field: string;
  fieldName: string;
}

export class Validate {
  static isEmpty(fields: Array<IFielder>, response: Response) {
    const errors: Array<IErro> = [];
    fields.map(({ field, fieldName }) => {
      if (field === "" || field === undefined) {
        errors.push({
          validation: "Is Empty",
          message: `Field (${fieldName}) is required`,
          fieldName,
        });
      }
    });

    if (errors.length > 0) {
      return response.status(401).json({
        errors,
      });
    }
  }

  static isEquals(fielder: IFielder, comparefield: string, response: Response) {
    const { field, fieldName } = fielder;

    if (field !== comparefield) {
      const error: IErro = {
        fieldName,
        message: `Filder (${fieldName}) are not same`,
        validation: "Is equals",
      };
      return response.status(401).json(error);
    }
  }
  static isMinMax(
    fielder: IFielder,
    maxMin: { min: number; max: number },
    response: Response
  ) {
    const { field, fieldName } = fielder;
    const { max, min } = maxMin;

    if (field.length > max) {
      const error: IErro = {
        fieldName,
        message: `Larger field (${fieldName}) than supported`,
        validation: "Max supported",
      };
      return response.status(401).json({
        error,
      });
    }
    if (field.length < min) {
      const error: IErro = {
        fieldName,
        message: `Smaller field (${fieldName}) than supported`,
        validation: "Smaller supported",
      };
      return response.status(401).json({
        error,
      });
    }
  }
  static isEmail(fielder: IFielder, response: Response) {
    const { field, fieldName } = fielder;
    const userEmail = field.substring(0, field.indexOf("@"));
    const domainEmail = field.substring(field.indexOf("@") + 1, field.length);

    if (
      userEmail.length >= 1 &&
      domainEmail.length >= 3 &&
      userEmail.search("@") == -1 &&
      domainEmail.search("@") == -1 &&
      userEmail.search(" ") == -1 &&
      domainEmail.search(" ") == -1 &&
      domainEmail.search(".") != -1 &&
      domainEmail.indexOf(".") >= 1 &&
      domainEmail.lastIndexOf(".") < domainEmail.length - 1
    ) {
    } else {
      const error: IErro = {
        fieldName,
        message: `Email (${field}) invalid`,
        validation: "Email invalid",
      };
      return response.status(401).json({
        error,
      });
    }
  }
}
