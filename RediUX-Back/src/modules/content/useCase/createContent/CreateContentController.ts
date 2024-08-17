import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateContentUseCase } from "./CreateContentUseCase";

class CreateContentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, autor, description, link, media_type, tags } = request.body;

    const createContentUseCase = container.resolve(CreateContentUseCase);

    try {
      const content = await createContentUseCase.execute({
        title,
        autor,
        description,
        link,
        media_type,
        tags,
      });

      return response.status(201).json(content);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}

export { CreateContentController };
