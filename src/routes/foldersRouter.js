import { Router } from "express";
import routerController from "../controllers/foldersController.js"
import { authNeeded } from "../middlewares/auth.js";
import ownershipCheck from "../middlewares/ownership.js";

const foldersRouter = Router();

foldersRouter.post('/create', authNeeded, routerController.postCreate);
foldersRouter.post('/:id/update', authNeeded, ownershipCheck, routerController.postEdit);
foldersRouter.post('/:id/delete', authNeeded, ownershipCheck, routerController.postDelete);

export default foldersRouter;