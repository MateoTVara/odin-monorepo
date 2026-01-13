import { Router } from "express";
import foldersController from "../controllers/foldersController.js";
import { authNeeded } from "../middlewares/auth.js";
import { checkOwnership } from "../middlewares/ownership.js";

const foldersRouter = Router();

foldersRouter.get('/:id',authNeeded, checkOwnership, foldersController.getById);
foldersRouter.post('/create', authNeeded, foldersController.postCreate);

export default foldersRouter;