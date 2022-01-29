const express = require('express');
const menu = express();
const { menu: MenuController } = require('../../controllers/user');
const menuController = new MenuController();

menu.get('/', menuController.getList);
menu.get('/:link', menuController.getOne);

module.exports = menu;
