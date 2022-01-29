const express = require('express');
const promocode = express();
const multer = require('multer');
const upload = multer();
const { promocode: PromocodeController } = require('../../controllers/admin');
const promocodeController = new PromocodeController();

promocode
  .route('/')
  .post(upload.none(), promocodeController.create)
  .get(promocodeController.getList);

promocode
  .route('/:id')
  .get(promocodeController.getOne)
  .patch(upload.none(), promocodeController.update)
  .delete(promocodeController.delete);

module.exports = promocode;
