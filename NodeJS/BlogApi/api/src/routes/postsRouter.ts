import { Router } from "express";
import { postsController } from "../controllers";
const postsRouter = Router();

postsRouter.get('/published', postsController.getAllPublished);

export { postsRouter };