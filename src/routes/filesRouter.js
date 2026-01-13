import { Router } from "express";
import filesController from "../controllers/filesController.js";
import { authNeeded } from "../middlewares/auth.js";
import { checkOwnership } from "../middlewares/ownership.js";
import multer from "multer";

const filesRouter = Router();
const upload = multer({ dest: "/home/marun/Projects/odin/projects/odin-file-uploader/uploads/" });

filesRouter.post('/upload', upload.array('files'), filesController.postUpload);
filesRouter.get('/:id', authNeeded, checkOwnership, filesController.get);

export default filesRouter;