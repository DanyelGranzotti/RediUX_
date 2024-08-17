import { Content } from "../../infra/typeorm/entity/Content";
import { Tag } from "../../infra/typeorm/entity/Tag";

interface IcreateContentDTO {
  title: string;
  autor: string;
  description: string;
  link: string;
  media_type: string;
  tags: Tag[];
}

interface IContentRepository {
  create({
    title,
    autor,
    description,
    link,
    media_type,
    tags,
  }: IcreateContentDTO): Promise<Content>;

  update(
    id: number,
    data: {
      title?: string;
      autor?: string;
      description?: string;
      link?: string;
      media_type?: string;
    },
  ): Promise<Content>;

  list(data: { id?: number; title?: string }): Promise<Content[]>;

  delete(id: number): Promise<void>;
}

export { IContentRepository, IcreateContentDTO };
