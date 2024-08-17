import { Router } from "express";

import { CreateContentController } from "../../../../../modules/content/useCase/createContent/CreateContentController";
import { UpdateContentController } from "../../../../../modules/content/useCase/updateContent/UpdateContentController";
import { DeleteContentController } from "../../../../../modules/content/useCase/deleteContent/DeleteContentController";
import { GetContentController } from "../../../../../modules/content/useCase/getContent/GetContentController";

const contentRoutes = Router();

const createContentController = new CreateContentController();
const deleteContentController = new DeleteContentController();
const getContentController = new GetContentController();
const updateContentController = new UpdateContentController();

contentRoutes.post("/", createContentController.handle);

contentRoutes.delete("/:id", deleteContentController.handle);

contentRoutes.get("/", getContentController.handle);

contentRoutes.patch("/:id", updateContentController.updateContent);
export { contentRoutes };
