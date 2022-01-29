const express = require('express');
const categories = express();
const multer = require('multer');
const upload = multer();
const { category: CategoryController } = require('../../controllers/admin');
const categoryController = new CategoryController();

categories
  .route('/')
  .get(categoryController.getList)
  .post(upload.none(), categoryController.create);

categories
  .route('/:id')
  .get(categoryController.getOne)
  .patch(upload.none(), categoryController.update)
  .delete(categoryController.delete);

module.exports = categories;
