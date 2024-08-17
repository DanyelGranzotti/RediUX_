import { UserAdmin } from "../../infra/typeorm/entify/UserAdmin";

interface ICreateUserDTO {
  email: string;
  password: string;
}

interface IUserRepository {
  create(email: string, password: string): Promise<UserAdmin>;
  findByEmail(email: string): Promise<UserAdmin>;
  findById(id: number): Promise<UserAdmin>;
}
export { IUserRepository, ICreateUserDTO };
