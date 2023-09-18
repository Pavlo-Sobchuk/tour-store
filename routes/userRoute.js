const express = require('express');

const controller = require('./../controllers/userController');
const routes = express.Router();

routes.route('/').get(controller.getAllUsers).post(controller.createUser);
routes
  .route('/api/v1/users/:id')
  .get(controller.getUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

module.exports = routes;
