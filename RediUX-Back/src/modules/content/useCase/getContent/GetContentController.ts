import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetContentUseCase } from "./GetContentUseCase";

class GetContentController {
  // this method returns a list of contents based on the id or title passed as a parameter
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, title } = req.query as { id?: string; title?: string };
    const getContentUseCase = container.resolve(GetContentUseCase);
    try {
      const content = await getContentUseCase.execute({
        id: Number(id),
        title: title as string,
      });

      return res.status(200).json(content);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}

export { GetContentController };
