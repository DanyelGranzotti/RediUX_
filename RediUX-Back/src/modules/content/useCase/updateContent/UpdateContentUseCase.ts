import { inject, injectable } from "tsyringe";
import { Content } from "../../infra/typeorm/entity/Content";
import { IContentRepository } from "../../repository/interface/IContentRepository";
import { AppError } from "../../../../shared/erros/AppError";
import { TagRepository } from "../../repository/TagRepository";

interface IRequest {
  title: string;
  autor: string;
  description: string;
  link: string;
  media_type: string;
  tags: number[];
}

@injectable()
class UpdateContentUseCase {
  constructor(
    @inject("ContentRepository")
    private contentRepository: IContentRepository,
    @inject("TagRepository")
    private tagRepository: TagRepository,
  ) {}

  // this method updates the content based on the id passed as a parameter
  async execute(
    id: number,
    { title, autor, description, link, media_type, tags }: IRequest,
  ): Promise<Content> {
    const content = await this.contentRepository.findById(id);

    if (!content) {
      throw new AppError("Content not found");
    }

    const tagEntities = await Promise.all(
      tags.map(async (tag) => {
        const tagById = await this.tagRepository.findById(tag);
        if (!tagById) {
          throw new AppError(`Tag not found: ${tag}`);
        }
        return tagById;
      }),
    );

    const contentUpdated = await this.contentRepository.update(id, {
      title,
      autor,
      description,
      link,
      media_type,
      tags: tagEntities,
    });

    return contentUpdated;
  }
}

export { UpdateContentUseCase };
