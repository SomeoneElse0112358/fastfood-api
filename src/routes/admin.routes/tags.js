const express = require('express');
const tags = express();
const multer = require('multer');
const upload = multer();
const { tag: TagController } = require('../../controllers/admin');
const tagController = new TagController();

tags
  .route('/')
  .post(upload.none(), tagController.create)
  .get(tagController.getList);

tags
  .route('/:id')
  .get(tagController.getOne)
  .patch(upload.none(), tagController.update)
  .delete(tagController.delete);

module.exports = tags;
