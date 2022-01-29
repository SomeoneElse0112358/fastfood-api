const express = require('express');
const users = express();
const multer = require('multer');
const upload = multer();
const { user: UserController } = require('../../controllers/admin');
const userController = new UserController();

users
  .route('/')
  .post(upload.none(), userController.create)
  .get(userController.getList);
users.get('/:id', userController.getOne);

module.exports = users;
