const express = require('express');
const { adminAuth } = require('../helpers/auth');
const api = express();
const adminsRouter = require('./admin.routes');
const usersRouter = require('./user.routes');

api.use('/', usersRouter);
api.use('/admin', adminAuth, adminsRouter);

module.exports = api;
