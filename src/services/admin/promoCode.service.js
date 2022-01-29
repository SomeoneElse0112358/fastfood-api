const { promoCode } = require('../../models');
const CommonService = require('../common.service');
const Checking = require('../../helpers/checking');
const checking = new Checking();

class PromocodeService extends CommonService {
  constructor() {
    super(promoCode);
  }

  async create(body) {
    if (
      (!checking.date(body.startDate) && body.startDate) ||
      (!checking.date(body.finalDate) && body.finalDate) ||
      !body.percent
    )
      return null;

    return super.create(body);
  }

  async update(id, body) {
    if (
      (!checking.date(body.startDate) && body.startDate) ||
      (!checking.date(body.finalDate) && body.finalDate) ||
      !body.percent
    )
      return null;

    return super.update(id, body);
  }
}

module.exports = PromocodeService;
