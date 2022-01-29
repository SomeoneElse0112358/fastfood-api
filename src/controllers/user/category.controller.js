const CommonController = require('../common.controller');
const { category: CategoryService } = require('../../services/user');
const categoryService = new CategoryService();

class CategoryController extends CommonController {
  constructor() {
    super(categoryService);
  }
}
module.exports = CategoryController;
