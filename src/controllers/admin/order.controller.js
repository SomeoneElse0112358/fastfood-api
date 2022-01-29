const CommonController = require('../common.controller');
const { order: OrderService } = require('../../services/admin/');
const orderService = new OrderService();

class OrderController extends CommonController {
  constructor() {
    super(orderService);
    this.service = orderService;
  }

  async getExcelofOrders(req, res) {
    if (!req.query.from || !req.query.to) {
      res.status(400);
    }
    try {
      const result = await this.service.getExcel(req.query);
      res.header(
        'Content-Disposition',
        `attachment; filename=orders` + '.xlsx'
      );
      res.type('xlsx');
      res.write(result, 'binary');
      res.end(null, 'binary');
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = OrderController;
