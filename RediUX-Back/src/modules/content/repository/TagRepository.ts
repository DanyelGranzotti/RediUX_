import { ITagRepository } from "./interface/ITagRepository";
import { Tag } from "../infra/typeorm/entity/Tag";
import { AppDataSource } from "../../../data-source";
import { Repository } from "typeorm";

class TagRepository implements ITagRepository {
  private repository: Repository<Tag>;
  constructor() {
    this.repository = AppDataSource.getRepository(Tag);
  }

  async create(data: { name: string }): Promise<Tag> {
    const tag = this.repository.create({
      name: data.name,
    });

    await this.repository.save(tag);
    return tag;
  }

  async findByName(name: string): Promise<Tag | null> {
    const tag = await this.repository.findOne({ where: { name } });
    return tag;
  }

  async list(data: { name?: string }): Promise<Tag[]> {
    const { name } = data;
    const tags = await this.repository
      .createQueryBuilder("tag")
      .where(name ? { name } : {})
      .getMany();
    return tags;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export { TagRepository };
