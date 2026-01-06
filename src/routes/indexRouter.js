// const { Router } = require('express');
import { Router } from 'express';
// const indexController = require('../controllers/indexController');
import indexController from '../controllers/indexController.js';
const indexRouter = Router();


indexRouter.get('/', indexController.getIndex);
indexRouter.post('/sign-up', indexController.postSignUp);
indexRouter.post('/login', indexController.postLogin);
indexRouter.get('/logout', indexController.getLogout);

export default indexRouter;