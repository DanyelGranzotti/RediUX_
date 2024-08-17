import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repository/interface/IContentRepository";

@injectable()
class DeleteContentUseCase {
  constructor(
    @inject("ContentRepository")
    private contentRepository: IContentRepository,
  ) {}

  async execute(contentId: number): Promise<void> {
    await this.contentRepository.delete(contentId);
  }
}

export { DeleteContentUseCase };
