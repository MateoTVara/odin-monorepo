import { Router } from "express";
import routerController from "../controllers/foldersController.js"
import { authNeeded } from "../middlewares/auth.js";
import { folderOwnership } from "../middlewares/ownership.js";

const foldersRouter = Router();

foldersRouter.post('/create', authNeeded, routerController.postCreate);
foldersRouter.post('/:id/update', authNeeded, folderOwnership, routerController.postEdit);
foldersRouter.post('/:id/delete', authNeeded, folderOwnership, routerController.postDelete);

export default foldersRouter;