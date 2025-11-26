const { Router } = require('express');
const staffController = require('../controllers/staffController');
const staffRouter = Router();

staffRouter.get('/:id/detail', staffController.getDetail);

module.exports = staffRouter;