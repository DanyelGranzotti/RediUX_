import { Request, Response } from "express";
import { GetTagUseCase } from "./GetTagUseCase";
import { container } from "tsyringe";

class GetTagController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getTagUseCase = container.resolve(GetTagUseCase);

    const { name } = request.query as { name?: string };
    try {
      const tag = await getTagUseCase.execute({ name: name as string });

      return response.status(200).json(tag);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}

export { GetTagController };
