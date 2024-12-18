import { inject, injectable } from "tsyringe";
import { TagRepository } from "../../repository/TagRepository";
import { AppError } from "../../../../shared/erros/AppError";

@injectable()
class DeleteTagUseCase {
  constructor(
    @inject("TagRepository")
    private tagRepository: TagRepository,
  ) {}

  async execute(tagId: number): Promise<void> {
    const tag = await this.tagRepository.findById(tagId);

    if (!tag) {
      throw new AppError("Tag not found", 404);
    }

    return await this.tagRepository.delete(tagId);
  }
}

export { DeleteTagUseCase };
