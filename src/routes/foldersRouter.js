import { Router } from "express";
import routerController from "../controllers/foldersController.js"
import { authNeeded } from "../middlewares/auth.js";

const foldersRouter = Router();

foldersRouter.post('/create', authNeeded, routerController.postCreate);
foldersRouter.post('/:id/update', authNeeded, routerController.postEdit);
foldersRouter.post('/:id/delete', authNeeded, routerController.postDelete);

export default foldersRouter;