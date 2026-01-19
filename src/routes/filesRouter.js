import { Router } from "express";
import filesController from "../controllers/filesController.js";
import { authNeeded } from "../middlewares/auth.js";
import { checkOwnership } from "../middlewares/ownership.js";
import multer from "multer";

const filesRouter = Router();
const upload = multer({
  dest: "/home/marun/Projects/odin/projects/odin-file-uploader/uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter(req, file, cb) {
    const allowed = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
});

filesRouter.post('/upload', authNeeded, upload.array('files'), filesController.postUpload);
filesRouter.get('/:id/download', authNeeded, checkOwnership, filesController.getDownload);
filesRouter.get('/:id', authNeeded, checkOwnership, filesController.get);

export default filesRouter;