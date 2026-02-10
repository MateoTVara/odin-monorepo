// api/src/routes/commentsRouter.ts
import { Router } from "express";
import { commentsController } from "../controllers";
import { authenticateJwt } from "../middlewares/authenticateJwt";
const commentsRouter = Router();

commentsRouter.post('/',
  authenticateJwt,
  commentsController.postCreate,
);
commentsRouter.get('/:id', commentsController.getById);
commentsRouter.get('/', commentsController.getAll);
commentsRouter.patch('/:id',
  authenticateJwt,
  commentsController.patchById
);
commentsRouter.delete('/:id',
  authenticateJwt,
  commentsController.deleteById
);

export { commentsRouter };