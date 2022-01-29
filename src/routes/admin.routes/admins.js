const express = require('express');
const admin = express();
const multer = require('multer');
const upload = multer();
const { admin: AdminController } = require('../../controllers/admin');
const adminController = new AdminController();

admin
  .route('/')
  .post(upload.none(), adminController.create)
  .get(adminController.getList);

admin
  .route('/:id')
  .get(adminController.getOne)
  .patch(upload.none(), adminController.update)
  .delete(adminController.delete);

module.exports = admin;
