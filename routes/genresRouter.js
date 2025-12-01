const { Router } = require('express');
const genresController = require('../controllers/genresController');
const genresRouter = Router();

genresRouter.post('/add', genresController.postAdd);

module.exports = genresRouter;