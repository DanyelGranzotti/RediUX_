import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserAdmin } from "./modules/users/infra/typeorm/entify/UserAdmin";
import { Content } from "./modules/content/infra/typeorm/entity/Content";
import { Tag } from "./modules/content/infra/typeorm/entity/Tag";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "rediux",
  entities: [UserAdmin, Content, Tag],
  migrations: ["./src/shared/infra/typeorm/migration/*.ts"],
});
