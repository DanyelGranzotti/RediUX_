import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetContentUseCase } from "./GetContentUseCase";

class GetContentController {
  // this method returns a list of contents based on the id or title passed as a parameter
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, title, page, limit, tag_id } = req.query as {
      id?: string;
      title?: string;
      page?: number;
      limit?: number;
      tag_id?: number;
    };
    const getContentUseCase = container.resolve(GetContentUseCase);
    try {
      const content = await getContentUseCase.execute({
        id: Number(id),
        title: title as string,
        page: page as number,
        limit: limit as number,
        tag_id: tag_id as number,
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
