const { Router } = require('express');
const messagesController = require('../controllers/messagesController');
const messagesRouter = Router();
const { isAuth } = require('../middleware/authMiddleware');

messagesRouter.post('/add', isAuth, messagesController.postAdd);

module.exports = messagesRouter;