import { Tag } from "../../infra/typeorm/entity/Tag";

interface ITagRepository {
  create(data: { name: string }): Promise<Tag>;
  delete(id: number): Promise<void>;
  list(data: { name?: string }): Promise<Tag[]>;
  findByName(name: string): Promise<Tag | null>;
}

export { ITagRepository };
