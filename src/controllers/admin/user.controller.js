const CommonController = require('../common.controller');
const { user: UserService } = require('../../services/admin');
const userService = new UserService();

class UserController extends CommonController {
  constructor() {
    super(userService);
  }
}

module.exports = UserController;
