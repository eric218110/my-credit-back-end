export interface IErrorValidator {
  message: string;
  fieldName: string;
  validation?: string;
}

interface IFielder {
  field: string;
  fieldName: string;
}

export class Validate {
  static isEmpty(fields: Array<IFielder>): Array<IErrorValidator> | true {
    const errors: Array<IErrorValidator> = [];
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
      return errors;
    }
    return true;
  }

  static isEquals(
    fielder: IFielder,
    comparefield: string
  ): IErrorValidator | true {
    const { field, fieldName } = fielder;

    if (field !== comparefield) {
      const error: IErrorValidator = {
        fieldName,
        message: `Filder (${fieldName}) are not same`,
        validation: "Is equals",
      };
      return error;
    }
    return true;
  }
  static isMinMax(
    fielder: IFielder,
    maxMin: { min: number; max: number }
  ): IErrorValidator | true {
    const { field, fieldName } = fielder;
    const { max, min } = maxMin;

    if (field.length > max) {
      const error: IErrorValidator = {
        fieldName,
        message: `Larger field (${fieldName}) than supported`,
        validation: "Max supported",
      };
      return error;
    }
    if (field.length < min) {
      const error: IErrorValidator = {
        fieldName,
        message: `Smaller field (${fieldName}) than supported`,
        validation: "Smaller supported",
      };
      return error;
    }
    return true;
  }
  static isEmail(fielder: IFielder): IErrorValidator | true {
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
      const error: IErrorValidator = {
        fieldName,
        message: `Email (${field}) invalid`,
        validation: "Email invalid",
      };
      return error;
    }
    return true;
  }
}
