const express = require('express');
const orders = express();
const { order: OrderController } = require('../../controllers/user');
const ordersController = new OrderController();

orders.route('/').post(ordersController.create).get(ordersController.getList);

module.exports = orders;
