import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteContentUseCase } from "./DeleteContentUseCase";

class DeleteContentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteContentUseCase = container.resolve(DeleteContentUseCase);
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const idInt = parseInt(id, 10);

    if (isNaN(idInt)) {
      return res.status(400).json({ message: "ID must be a number" });
    }

    try {
      await deleteContentUseCase.execute(idInt);
      return res.status(200).send();
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}

export { DeleteContentController };
