const { Router } = require('express');
const staffController = require('../controllers/staffController');
const staffRouter = Router();

staffRouter.get('/', staffController.getAll);
staffRouter.get('/:id/detail', staffController.getDetail);
staffRouter.get('/add', staffController.getAdd);
staffRouter.post('/addFully', staffController.postAddFully);
staffRouter.post('/add', staffController.postAdd);
staffRouter.get('/:id/update', staffController.getUpdate);
staffRouter.post('/:id/update', staffController.postUpdate);
staffRouter.post('/:id/delete', staffController.del);

module.exports = staffRouter;