const express = require('express');
const { userAuth } = require('../../helpers/auth');
const user = express();
const categoriesRouter = require('./categories');
const menuRouter = require('./menu');
const ordersRouter = require('./orders');
const tagsRouter = require('./tags');
const usersRouter = require('./users');

user.use('/categories', categoriesRouter);
user.use('/menu', menuRouter);
user.use('/orders', userAuth, ordersRouter);
user.use('/tags', tagsRouter);
user.use('/users', userAuth, usersRouter);

module.exports = user;
