const { Router } = require('express');
const mangaController = require('../controllers/mangaController');
const mangaRouter = Router();

mangaRouter.get('/', mangaController.getAll);
mangaRouter.get('/:id/detail', mangaController.getDetail);
mangaRouter.get('/add', mangaController.getAdd);

module.exports = mangaRouter;