const { Router } = require('express');
const messagesController = require('../controllers/messagesController');
const messagesRouter = Router();
const { authNeeded } = require('../middlewares/auth');
const { adminNeeded } = require('../middlewares/roles');

messagesRouter.post('/add', authNeeded, messagesController.postAdd);
messagesRouter.post('/:id/delete', adminNeeded, messagesController.postDelete);

module.exports = messagesRouter;