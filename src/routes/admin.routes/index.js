const express = require('express');
const api = express();
const adminsRouter = require('./admins');
const categoriesRouter = require('./categories');
const menuRouter = require('./menu');
const ordersRouter = require('./orders');
const promoCodesRouter = require('./promoCodes');
const tagsRouter = require('./tags');
const usersRouter = require('./users');
const uploadRouter = require('./upload');

api.use('/admins', adminsRouter);
api.use('/categories', categoriesRouter);
api.use('/menu', menuRouter);
api.use('/orders', ordersRouter);
api.use('/promocodes', promoCodesRouter);
api.use('/tags', tagsRouter);
api.use('/upload', uploadRouter);
api.use('/users', usersRouter);

module.exports = api;
