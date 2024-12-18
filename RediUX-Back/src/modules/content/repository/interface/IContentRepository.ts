import { Content } from "../../infra/typeorm/entity/Content";
import { ITag } from "../../infra/typeorm/entity/interface/ITag";

interface ContentDTO {
  title: string;
  autor: string;
  description: string;
  link: string;
  media_type: string;
  tags: ITag[];
}

interface IContentRepository {
  create({
    title,
    autor,
    description,
    link,
    media_type,
    tags,
  }: ContentDTO): Promise<Content>;

  update(id: number, data: ContentDTO): Promise<Content>;

  list(data: { id?: number; title?: string }): Promise<Content[]>;

  delete(id: number): Promise<void>;

  findByTitle(title: string): Promise<Content | null>;

  findById(id: number): Promise<Content | null>;
}

export { IContentRepository, ContentDTO };
