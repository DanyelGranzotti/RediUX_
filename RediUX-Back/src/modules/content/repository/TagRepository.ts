import { ITagRepository } from "./interface/ITagRepository";
import { Tag } from "../infra/typeorm/entity/Tag";
import { AppDataSource } from "../../../data-source";
import { ILike, Repository } from "typeorm";

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

  async findById(id: number): Promise<Tag | null> {
    const tag = await this.repository.findOne({
      where: { id },
    });
    return tag;
  }

  async findByName(name: string): Promise<Tag | null> {
    const tag = await this.repository.findOne({
      where: { name: ILike(name) },
    });
    return tag;
  }

  async list(data: {
    name?: string;
    page?: number;
    limit?: number;
  }): Promise<Tag[]> {
    const { name, page = 1, limit = 10 } = data;
    const queryBuilder = this.repository.createQueryBuilder("tag");

    if (name) {
      queryBuilder.where("tag.name ILIKE :name", { name: `%${name}%` });
    }
    if (page && limit) {
      const offset = (page - 1) * limit;
      queryBuilder.skip(offset).take(limit);
    }

    const tags = await queryBuilder.getMany();
    return tags;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export { TagRepository };
