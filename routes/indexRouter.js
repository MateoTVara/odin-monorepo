const {Router} = require('express')
const indexRouter = Router()

const indexController = require('../controllers/indexController')

indexRouter.get('/', indexController.get);
indexRouter.post('/newMsg', indexController.newMsg);
indexRouter.post('/newUser', indexController.newUser);
indexRouter.post('/logout', indexController.logout);

module.exports = indexRouter;