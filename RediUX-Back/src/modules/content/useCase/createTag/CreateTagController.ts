import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTagUseCase } from "./CreateTagUseCase";

class CreateTagController {
  // this method is responsible for creating a new tag
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createTagUseCase = container.resolve(CreateTagUseCase);

    try {
      const tag = await createTagUseCase.execute({ name });

      return response.status(201).send(tag);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}

export { CreateTagController };
