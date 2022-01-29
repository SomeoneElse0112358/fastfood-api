const express = require('express');
const menu = express();
const multer = require('multer');
const upload = multer();
const { menu: MenuController } = require('../../controllers/admin');
const menuController = new MenuController();

menu.route('/').get(menuController.getList).post(menuController.create);

menu
  .route('/:id')
  .get(menuController.getOne)
  .patch(upload.none(), menuController.update)
  .delete(menuController.delete);

menu.post('/dragndrop', upload.none(), menuController.dragAndDrop);

menu.patch('/deletediscount/:id', upload.none(), menuController.deleteDiscount);

module.exports = menu;
