import { Router } from "express";
import { CreateTagController } from "../../../../../modules/content/useCase/createTag/CreateTagController";
import { DeleteTagController } from "../../../../../modules/content/useCase/deleteTag/DeleteTagController";
import { GetTagController } from "../../../../../modules/content/useCase/getTag/GetTagController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const TagRoutes = Router();

const createTagController = new CreateTagController();
const deleteTagController = new DeleteTagController();
const getTagController = new GetTagController();

TagRoutes.post("/", ensureAuthenticated, createTagController.handle);
TagRoutes.delete("/:id", deleteTagController.handle);
TagRoutes.get("/", getTagController.handle);

export { TagRoutes };
