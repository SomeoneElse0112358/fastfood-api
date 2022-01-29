const { category } = require('../../models');
const CommonService = require('../common.service');

class CategoryService extends CommonService {
  constructor() {
    super(category);
    this.model = category;
  }
  async getList() {
    return super.getList({}, { _id: 0, __v: 0 });
  }
}

module.exports = CategoryService;
