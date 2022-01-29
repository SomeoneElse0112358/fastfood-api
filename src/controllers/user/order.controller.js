const CommonController = require('../common.controller');
const { order: OrderService } = require('../../services/user');
const orderService = new OrderService();

class OrderController extends CommonController {
  constructor() {
    super(orderService);
  }

  async getList(req, res) {
    if ((!req.query.numberOfOrder && !req.query.user) || !req.query.user) {
      res.status(403).send({ message: 'Access denied!' });
    }
    return super.getList(req, res);
  }
}

module.exports = OrderController;
