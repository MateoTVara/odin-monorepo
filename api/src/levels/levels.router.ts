import { Router } from "express";
import levelsController from "./levels.controller";

const levelsRouter = Router();

levelsRouter.get("/", levelsController.getAll);
levelsRouter.get("/:id", levelsController.getDetail);

export default levelsRouter;