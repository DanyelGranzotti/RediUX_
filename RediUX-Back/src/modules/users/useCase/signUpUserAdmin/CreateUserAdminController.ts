import { Request, Response } from "express";
import { CreateUserAdminUseCase } from "./CreateUserAdminUseCase";
import { container } from "tsyringe";

class CreateUserAdminController {
  // this method creates a new user based on the email and password passed as a parameter
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUserAdminUseCase = container.resolve(CreateUserAdminUseCase);
    try {
      const user = await createUserAdminUseCase.execute({
        email,
        password,
      });

      return response.status(201).send(user);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}

export { CreateUserAdminController };
