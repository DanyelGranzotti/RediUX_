import { Router } from "express";

import { contentRoutes } from "./implementation/content.routes";
import { TagRoutes } from "./implementation/tag.routes";
import { userRouter } from "./implementation/user.routes";

const routes = Router();
routes.use("/content", contentRoutes);
routes.use("/tag", TagRoutes);
routes.use("/user", userRouter);
export { routes };
