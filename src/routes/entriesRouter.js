import { Router } from "express";
import entriesController from "../controllers/entriesController.js";
import { authNeeded } from "../middlewares/auth.js";
import { checkOwnership } from "../middlewares/ownership.js";
import multer from "multer";

const entriesRouter = Router();
const upload = multer({ dest: "/home/marun/Projects/odin/projects/odin-file-uploader/uploads/" })

entriesRouter.post('/create-folder', authNeeded, entriesController.postCreateFolder);
entriesRouter.post('/upload', upload.array('files'), entriesController.postUploadFile);
entriesRouter.post('/:id/rename', authNeeded, checkOwnership, entriesController.postRename);
entriesRouter.post('/:id/delete', authNeeded, checkOwnership, entriesController.postDelete);

export default entriesRouter;