const { Router } = require('express');
const mangaController = require('../controllers/mangaController');
const mangaRouter = Router();

mangaRouter.get('/', mangaController.getAll);

module.exports = mangaRouter;