import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    //Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public serializeError() {
    return this.errors.map((item) => {
      return { message: item.msg, field: item.param };
    });
  }
}
