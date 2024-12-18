import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repository/interface/IContentRepository";
import { TagRepository } from "../../repository/TagRepository";
import { AppError } from "../../../../shared/erros/AppError";

interface IRequest {
  title: string;
  autor: string;
  description: string;
  link: string;
  media_type: string;
  tags: number[];
}

@injectable()
class CreateContentUseCase {
  constructor(
    @inject("ContentRepository")
    private contentRepository: IContentRepository,
    @inject("TagRepository")
    private tagRepository: TagRepository,
  ) {}

  async execute({
    title,
    autor,
    description,
    link,
    media_type,
    tags,
  }: IRequest) {
    const tagEntities = await Promise.all(
      tags.map(async (tag) => {
        const tagById = await this.tagRepository.findById(tag);
        if (!tagById) {
          throw new AppError("Tag not found");
        }
        return tagById;
      }),
    );

    const contentFindByTitle = await this.contentRepository.findByTitle(title);

    if (contentFindByTitle) {
      throw new AppError("Content already exists");
    }

    const newContent = await this.contentRepository.create({
      title,
      autor,
      description,
      link,
      media_type,
      tags: tagEntities,
    });

    return newContent;
  }
}

export { CreateContentUseCase };
