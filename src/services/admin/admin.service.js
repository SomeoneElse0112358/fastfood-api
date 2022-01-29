const bcrypt = require('bcrypt');
const { admin } = require('../../models/');
const CommonService = require('../common.service');
const salt = bcrypt.genSaltSync(10);

class AdminService extends CommonService {
  constructor() {
    super(admin);
    this.model = admin;
  }

  async create(body) {
    if (await this.model.findOne({ email: body.email })) return null;
    return super.create({
      ...body,
      password: bcrypt.hashSync(body.password, salt)
    });
  }

  async update(id, body) {
    if (await this.model.findOne({ email: body.email })) {
      return null;
    } else if (body.password) {
      return super.update(id, {
        ...body,
        password: bcrypt.hashSync(body.password, salt)
      });
    }
    return super.update(id, body);
  }
}

module.exports = AdminService;
