import { Router } from "express";
import { postsController } from "../controllers";
const postsRouter = Router();

postsRouter.post('/', postsController.postCreate);
postsRouter.get('/published', postsController.getAllPublished);
postsRouter.get('/published/:id', postsController.getPublished);
postsRouter.patch('/:id', postsController.patchUpdate);
postsRouter.delete('/:id', postsController.delete);

export { postsRouter };