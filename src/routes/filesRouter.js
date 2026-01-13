import { Router } from "express";
import filesController from "../controllers/filesController.js";

const filesRouter = Router();

filesRouter.get('/:id', filesController.get);

export default filesRouter;