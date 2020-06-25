// CADASTRA NOVO USUÁRIO

import { Response, Request } from "express";

class SignupController {
  constructor() {}

  async create(request: Request, response: Response) {
    return response.json({ eric: "eric" });
  }
}
