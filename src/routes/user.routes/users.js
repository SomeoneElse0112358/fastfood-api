const express = require('express');
const users = express();
const multer = require('multer');
const upload = multer();
const { user: UserController } = require('../../controllers/user');
const userController = new UserController();

users
  .route('/:id')
  .get(userController.getOne)
  .patch(upload.none(), userController.update)
  .delete(userController.delete);

users.get('/bonuses/:id', userController.bonusesCheck);
users.post('/subscribe/:id', userController.subscribeTo);
users.post('/unsubscribe/:id', userController.unsubsribeFrom);

module.exports = users;
