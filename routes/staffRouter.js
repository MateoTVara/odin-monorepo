const { Router } = require('express');
const staffController = require('../controllers/staffController');
const staffRouter = Router();

staffRouter.get('/', staffController.getAll);
staffRouter.get('/:id/detail', staffController.getDetail);
staffRouter.post('/add', staffController.postAdd);
staffRouter.post('/:id/delete', staffController.del);

module.exports = staffRouter;