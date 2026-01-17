import { Router } from 'express';
import indexController from '../controllers/indexController.js';
import { authNeeded } from '../middlewares/auth.js';
import { checkOwnership } from '../middlewares/ownership.js';

const indexRouter = Router();

indexRouter.get('/', authNeeded, indexController.getIndex);
// indexRouter.get('/folder/:id', authNeeded, checkOwnership, indexController.getFolder);
indexRouter.get('/auth', indexController.getAuth);
indexRouter.post('/sign-up', indexController.postSignUp);
indexRouter.post('/login', indexController.postLogin);
indexRouter.get('/logout', authNeeded, indexController.getLogout);

export default indexRouter;