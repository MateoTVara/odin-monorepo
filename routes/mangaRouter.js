const { Router } = require('express');
const mangaController = require('../controllers/mangaController');
const mangaRouter = Router();

mangaRouter.get('/', mangaController.getAll);
mangaRouter.get('/:id/detail', mangaController.getDetail);
mangaRouter.get('/add', mangaController.getAdd);
mangaRouter.post('/add', mangaController.postAdd);
mangaRouter.get('/:id/update', mangaController.getUpdate);
mangaRouter.post('/:id/update', mangaController.postUpdate);
mangaRouter.post('/:id/delete', mangaController.del);

module.exports = mangaRouter;