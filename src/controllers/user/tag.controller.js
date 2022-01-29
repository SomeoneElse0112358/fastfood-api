const CommonController = require('../common.controller');
const { tag: TagsService } = require('../../services/user');
const tagsService = new TagsService();

class TagController extends CommonController {
  constructor() {
    super(tagsService);
  }
}

module.exports = TagController;
