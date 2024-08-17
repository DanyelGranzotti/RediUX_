import { Repository } from "typeorm";
import { IUserRepository } from "./interface/IUserRepository";
import { UserAdmin } from "../infra/typeorm/entify/UserAdmin";
import { AppDataSource } from "../../../data-source";

class UserRepository implements IUserRepository {
  private repository: Repository<UserAdmin>;
  constructor() {
    this.repository = AppDataSource.getRepository(UserAdmin);
  }

  async create(email: string, password: string): Promise<UserAdmin> {
    const user = this.repository.create({
      email,
      password,
    });

    await this.repository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<UserAdmin> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<UserAdmin> {
    const user = await this.repository.findOne({
      where: { id: id.toString() },
    });
    return user;
  }
}

export { UserRepository };
