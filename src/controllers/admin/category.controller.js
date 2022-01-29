const CommonController = require('../common.controller');
const { category: CategoryService } = require('../../services/admin/');
const categoryService = new CategoryService();

class CategoryController extends CommonController {
  constructor() {
    super(categoryService);
  }
}

module.exports = CategoryController;
