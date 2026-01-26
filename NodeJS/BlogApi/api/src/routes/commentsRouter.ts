// api/src/routes/commentsRouter.ts
import { Router } from "express";
import { commentsController } from "../controllers";
import passport from "passport";
const commentsRouter = Router();

commentsRouter.post('/',
  passport.authenticate('jwt', { session: false }),
  commentsController.postCreate,
);
commentsRouter.get('/:id', commentsController.getById);
commentsRouter.get('/', commentsController.getAll);
commentsRouter.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  commentsController.patchById
);
commentsRouter.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  commentsController.deleteById
);

export { commentsRouter };