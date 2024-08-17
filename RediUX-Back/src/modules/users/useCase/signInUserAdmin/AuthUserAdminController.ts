import { container } from "tsyringe";
import { AuthUserAdminUseCase } from "./AuthUserAdminUseCase";
import { Request, Response } from "express";

class AuthUserAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUserAdminUseCase = container.resolve(AuthUserAdminUseCase);
    const token = await authUserAdminUseCase.execute({
      email,
      password,
    });

    return response.status(200).json(token);
  }
}

export { AuthUserAdminController };
