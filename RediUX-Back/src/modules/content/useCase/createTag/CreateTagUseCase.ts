import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/erros/AppError";
import { Tag } from "../../infra/typeorm/entity/Tag";
import { ITagRepository } from "../../repository/interface/ITagRepository";

@injectable()
class CreateTagUseCase {
  constructor(
    @inject("TagRepository")
    private tagRepository: ITagRepository,
  ) {}

  // this method is responsible for creating a new tag
  async execute(data: { name: string }): Promise<Tag> {
    const { name } = data;
    const tag = await this.tagRepository.findByName(name);

    if (tag) {
      throw new AppError("Tag already exists");
    }

    return this.tagRepository.create(data);
  }
}

export { CreateTagUseCase };
