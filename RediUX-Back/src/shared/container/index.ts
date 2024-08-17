import { container } from "tsyringe";

import { ContentRepository } from "../../modules/content/repository/ContentRepository";
import { IContentRepository } from "../../modules/content/repository/interface/IContentRepository";
import { ITagRepository } from "../../modules/content/repository/interface/ITagRepository";
import { TagRepository } from "../../modules/content/repository/TagRepository";
import { IUserRepository } from "../../modules/users/repository/interface/IUserRepository";
import { UserRepository } from "../../modules/users/repository/UserRepository";

container.registerSingleton<IContentRepository>(
  "ContentRepository",
  ContentRepository,
);

container.registerSingleton<ITagRepository>("TagRepository", TagRepository);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
