const { Router } = require('express');
const rolesController = require('../controllers/rolesController');
const rolesRouter = Router();

rolesRouter.post('/add', rolesController.postAdd);
rolesRouter.post('/:id/update', rolesController.postUpdate);
rolesRouter.post('/:id/delete', rolesController.postDelete);

module.exports = rolesRouter;