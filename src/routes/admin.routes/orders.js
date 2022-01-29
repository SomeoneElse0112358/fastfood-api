const express = require('express');
const orders = express();
const { order: OrdersController } = require('../../controllers/admin');
const ordersController = new OrdersController();

orders.get('/', ordersController.getList);
orders.get('/download/', ordersController.getExcelofOrders);

module.exports = orders;
