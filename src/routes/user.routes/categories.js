const express = require('express');
const categories = express();
const { category: CategoryController } = require('../../controllers/user');
const categoryController = new CategoryController();

categories.get('/', categoryController.getList);

module.exports = categories;
