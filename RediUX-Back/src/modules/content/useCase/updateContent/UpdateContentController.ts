import { Request, Response } from "express";
import { UpdateContentUseCase } from "./UpdateContentUseCase";
import { container } from "tsyringe";

class UpdateContentController {
  async updateContent(req: Request, res: Response): Promise<Response> {
    const updateContentUseCase = container.resolve(UpdateContentUseCase);

    try {
      const { id } = req.params;
      const data: {
        title?: string;
        autor?: string;
        description?: string;
        link?: string;
        media_type?: string;
      } = req.body;

      // Check if ID is valid
      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }

      // Check if ID is a number
      const idInt = parseInt(id, 10);
      if (isNaN(idInt)) {
        return res.status(400).json({ message: "ID must be a number" });
      }

      const updatedContent = await updateContentUseCase.execute(idInt, data);

      return res.status(200).json(updatedContent);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}

export { UpdateContentController };
