import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repository/interface/IContentRepository";
import { Tag } from "../../infra/typeorm/entity/Tag";

interface IRequest {
  title: string;
  autor: string;
  description: string;
  link: string;
  media_type: string;
  tags: Tag[];
}

@injectable()
class CreateContentUseCase {
  constructor(
    @inject("ContentRepository")
    private contentRepository: IContentRepository,
  ) {}

  // this method creates a new content in the database
  async execute({
    title,
    autor,
    description,
    link,
    media_type,
    tags,
  }: IRequest) {
    const content = await this.contentRepository.create({
      title,
      autor,
      description,
      link,
      media_type,
      tags,
    });

    return content;
  }
}

export { CreateContentUseCase };
