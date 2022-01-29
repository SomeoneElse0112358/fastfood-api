const CommonController = require('../common.controller');
const { promocode: PromocodeService } = require('../../services/admin');
const promocodeService = new PromocodeService();

class PromocodeController extends CommonController {
  constructor() {
    super(promocodeService);
  }
}

module.exports = PromocodeController;
