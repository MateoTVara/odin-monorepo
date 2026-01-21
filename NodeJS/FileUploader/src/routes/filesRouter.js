import { Router } from "express";
import filesController from "../controllers/filesController.js";
import { authNeeded } from "../middlewares/auth.js";
import { checkOwnership } from "../middlewares/ownership.js";
import multer from "multer";

const filesRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

filesRouter.post('/upload', authNeeded, upload.array('files'), filesController.postUpload);
filesRouter.get('/:id/download', authNeeded, checkOwnership, filesController.getDownload);
filesRouter.get('/:id', authNeeded, checkOwnership, filesController.get);

export default filesRouter;