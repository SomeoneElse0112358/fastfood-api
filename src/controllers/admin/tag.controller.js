const CommonController = require('../common.controller');
const { tag: TagService } = require('../../services/admin');
const tagService = new TagService();

class TagController extends CommonController {
  constructor() {
    super(tagService);
  }
}

module.exports = TagController;
