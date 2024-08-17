import { inject, injectable } from "tsyringe";
import { ITagRepository } from "../../repository/interface/ITagRepository";

@injectable()
class DeleteTagUseCase {
  constructor(
    @inject("TagRepository")
    private tagRepository: ITagRepository,
  ) {}

  async execute(tagId: number): Promise<void> {
    return this.tagRepository.delete(tagId);
  }
}

export { DeleteTagUseCase };
