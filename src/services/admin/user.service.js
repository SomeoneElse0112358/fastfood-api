const bcrypt = require('bcrypt');
const { user } = require('../../models/');
const CommonService = require('../common.service');
const salt = bcrypt.genSaltSync(10);

class UserService extends CommonService {
  constructor() {
    super(user);
  }

  async create(body) {
    return super.create({
      ...body,
      password: bcrypt.hashSync(body.password, salt)
    });
  }
}

module.exports = UserService;
