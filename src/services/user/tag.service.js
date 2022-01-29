const { tag } = require('../../models');
const CommonService = require('../common.service');

class TagService extends CommonService {
  constructor() {
    super(tag);
    this.model = tag;
  }
  async getList() {
    return super.getList({}, { _id: 0, __v: 0 });
  }
}

module.exports = TagService;
