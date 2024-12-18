import { inject, injectable } from "tsyringe";
import { Tag } from "../../infra/typeorm/entity/Tag";

import { TagRepository } from "../../repository/TagRepository";

@injectable()
class GetTagUseCase {
  constructor(
    @inject("TagRepository")
    private tagRepository: TagRepository,
  ) {}

  async execute(data: {
    name?: string;
    page?: number;
    limit?: number;
  }): Promise<Tag[]> {
    const tag = await this.tagRepository.list(data);
    return tag;
  }
}

export { GetTagUseCase };
