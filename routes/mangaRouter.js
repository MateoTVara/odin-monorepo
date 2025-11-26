const { Router } = require('express');
const mangaController = require('../controllers/mangaController');
const mangaRouter = Router();

mangaRouter.get('/', mangaController.getAll);
mangaRouter.get('/:id/detail', mangaController.getById);

module.exports = mangaRouter;