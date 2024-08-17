import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/erros/AppError";
import { Tag } from "../../infra/typeorm/entity/Tag";

import { TagRepository } from "../../repository/TagRepository";

@injectable()
class GetTagUseCase {
  constructor(
    @inject("TagRepository")
    private tagRepository: TagRepository,
  ) {}

  async execute(data: { name?: string }): Promise<Tag[]> {
    const tag = await this.tagRepository.list(data);

    if (!tag) {
      throw new AppError("Tag not found");
    }
    return tag;
  }
}

export { GetTagUseCase };
