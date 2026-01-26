// api/src/routes/commentsRouter.ts
import { Router } from "express";
import { commentsController } from "../controllers";
import passport from "passport";
const commentsRouter = Router();

commentsRouter.post('/',
  passport.authenticate('jwt', { session: false }),
  commentsController.create,
);
commentsRouter.get('/:id', commentsController.readById);
commentsRouter.get('/', commentsController.readAll);
commentsRouter.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  commentsController.update
);
commentsRouter.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  commentsController.delete
);

export { commentsRouter };