import { Request, Response } from "express";
import { UpdateContentUseCase } from "./UpdateContentUseCase";
import { container } from "tsyringe";
import { SchemaContent } from "../../infra/zod/SchemaContent";

class UpdateContentController {
  async updateContent(req: Request, res: Response): Promise<Response> {
    const updateContentUseCase = container.resolve(UpdateContentUseCase);

    const { id } = req.params;
    const { title, autor, description, link, media_type, tags } =
      SchemaContent.parse(req.body);

    const idInt = Number(id);

    const updatedContent = await updateContentUseCase.execute(idInt, {
      title,
      autor,
      description,
      link,
      media_type,
      tags,
    });

    return res.status(200).json(updatedContent);
  }
}

export { UpdateContentController };
