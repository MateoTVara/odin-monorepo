// api/src/routes/postsRouter.ts
import { Router } from "express";
import { postsController } from "../controllers";
import passport from "passport";
import { requireRole } from "../middlewares/requireRole";
const postsRouter = Router();

postsRouter.post('/',
  passport.authenticate('jwt', { session: false }),
  requireRole('ADMIN'),
  postsController.postCreate
);
postsRouter.get('/published', postsController.getAllPublished);
postsRouter.get('/published/:id', postsController.getPublished);
postsRouter.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  requireRole('ADMIN'),
  postsController.patchUpdate,
);
postsRouter.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  requireRole('ADMIN'),
  postsController.delete
);

export { postsRouter };