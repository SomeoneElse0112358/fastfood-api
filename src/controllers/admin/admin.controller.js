const CommonController = require('../common.controller');
const { admin: AdminsService } = require('../../services/admin');
const adminService = new AdminsService();

class AdminController extends CommonController {
  constructor() {
    super(adminService);
  }
}

module.exports = AdminController;
