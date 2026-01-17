const { Router } = require('express');
const genresController = require('../controllers/genresController');
const genresRouter = Router();

genresRouter.post('/add', genresController.postAdd);
genresRouter.post('/:id/update', genresController.postUpdate);
genresRouter.post('/:id/delete', genresController.postDelete);

module.exports = genresRouter;