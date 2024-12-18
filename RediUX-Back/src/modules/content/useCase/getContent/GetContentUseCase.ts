import { ContentRepository } from "../../repository/ContentRepository";
import { inject, injectable } from "tsyringe";
import { Content } from "../../infra/typeorm/entity/Content";

@injectable()
class GetContentUseCase {
  constructor(
    @inject("ContentRepository")
    private contentRepository: ContentRepository,
  ) {}

  // this method returns a list of contents based on the id or title passed as a parameter
  async execute(data: {
    id?: number;
    title?: string;
    page?: number;
    limit?: number;
    tag_id?: number;
  }): Promise<Content[]> {
    return this.contentRepository.list(data);
  }
}

export { GetContentUseCase };
