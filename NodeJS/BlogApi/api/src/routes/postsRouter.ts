// api/src/routes/postsRouter.ts
import { Router } from "express";
import { postsController } from "../controllers";
import { authenticateJwt } from "../middlewares/authenticateJwt";
import { requireRole } from "../middlewares/requireRole";
const postsRouter = Router();

postsRouter.post('/',
  authenticateJwt,
  requireRole('ADMIN'),
  postsController.postCreate
);
postsRouter.get('/published/:id', postsController.getPublishedById);
postsRouter.get('/published', postsController.getAllPublished);
postsRouter.get('/:id',
  authenticateJwt,
  requireRole('ADMIN'),
  postsController.getById
)
postsRouter.get('/',
  authenticateJwt,
  requireRole('ADMIN'),
  postsController.getAll
);
postsRouter.patch('/:id',
  authenticateJwt,
  requireRole('ADMIN'),
  postsController.patchById,
);
postsRouter.delete('/:id',
  authenticateJwt,
  requireRole('ADMIN'),
  postsController.deleteById
);

export { postsRouter };