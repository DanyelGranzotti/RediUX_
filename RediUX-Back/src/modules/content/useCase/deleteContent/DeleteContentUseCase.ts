import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repository/interface/IContentRepository";
import { AppError } from "../../../../shared/erros/AppError";

@injectable()
class DeleteContentUseCase {
  constructor(
    @inject("ContentRepository")
    private contentRepository: IContentRepository,
  ) {}

  async execute(contentId: number): Promise<void> {
    const content = await this.contentRepository.findById(contentId);

    if (!content) {
      throw new AppError("Content not found");
    }

    return await this.contentRepository.delete(contentId);
  }
}

export { DeleteContentUseCase };
