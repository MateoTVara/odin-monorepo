import { Router } from "express";
import { commentsController } from "../controllers";
const commentsRouter = Router();

commentsRouter.post('/', commentsController.create);
commentsRouter.get('/:id', commentsController.readById);
commentsRouter.get('/', commentsController.readAll);
commentsRouter.patch('/:id', commentsController.update);
commentsRouter.delete('/:id', commentsController.delete);

export { commentsRouter };