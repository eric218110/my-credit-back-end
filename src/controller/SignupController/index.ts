// CADASTRA NOVO USUÁRIO

import { Response } from "express";

class SignupController {
  constructor() {}

  async create(request: Request, response: Response) {
    return response.json({ eric: "eric" });
  }
}
