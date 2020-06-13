import { Request, Response, NextFunction } from "express";

export class UserMiddleware {
  constructor() {}
  async createUser(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, password, confirme_password } = request.body;

      if (
        name === undefined ||
        email === undefined ||
        password === undefined ||
        confirme_password === undefined
      ) {
        return response.status(401).json({
          error: "exist empty value",
        });
      }
      next();
    } catch (error) {
      return response.status(401).json({
        error: "exist empty value",
      });
    }
  }
}
