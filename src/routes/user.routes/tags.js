const express = require('express');
const tags = express();
const { tag: TagsController } = require('../../controllers/user');
const tagsController = new TagsController();

tags.get('/', tagsController.getList);

module.exports = tags;
