import { Request, Response } from "express";
import { DeleteTagUseCase } from "./DeleteTagUseCase";
import { AppError } from "../../../../shared/erros/AppError";
import { container } from "tsyringe";

class DeleteTagController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteTagUseCase = container.resolve(DeleteTagUseCase);
    const { id } = request.params;

    if (!id) {
      throw new AppError("ID is required", 400);
    }

    const idInt = Number(id);

    if (isNaN(idInt)) {
      throw new AppError("ID must be a number", 400);
    }

    try {
      const tag = await deleteTagUseCase.execute(idInt);
      return response.status(204).send(tag);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}

export { DeleteTagController };
