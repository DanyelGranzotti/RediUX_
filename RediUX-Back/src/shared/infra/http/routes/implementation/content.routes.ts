import { Router } from "express";

import { CreateContentController } from "../../../../../modules/content/useCase/createContent/CreateContentController";
import { UpdateContentController } from "../../../../../modules/content/useCase/updateContent/UpdateContentController";
import { DeleteContentController } from "../../../../../modules/content/useCase/deleteContent/DeleteContentController";
import { GetContentController } from "../../../../../modules/content/useCase/getContent/GetContentController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const contentRoutes = Router();

const createContentController = new CreateContentController();
const deleteContentController = new DeleteContentController();
const getContentController = new GetContentController();
const updateContentController = new UpdateContentController();

contentRoutes.post("/", ensureAuthenticated, createContentController.handle);

contentRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteContentController.handle,
);

contentRoutes.get("/", getContentController.handle);

contentRoutes.put(
  "/:id",
  ensureAuthenticated,
  updateContentController.updateContent,
);
export { contentRoutes };
