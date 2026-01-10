import { Router } from "express";
import entriesController from "../controllers/entriesController.js";
import { authNeeded } from "../middlewares/auth.js";
import { entriesOwnership } from "../middlewares/ownership.js";

const entriesRouter = Router();

entriesRouter.post('/:id/rename', authNeeded, entriesOwnership, entriesController.postRename);
entriesRouter.post('/:id/delete', authNeeded, entriesOwnership, entriesController.postDelete);

export default entriesRouter;