const CommonController = require('../common.controller');
const { menu: MenuService } = require('../../services/admin');
const menuService = new MenuService();

class MenuController extends CommonController {
  constructor() {
    super(menuService);
    this.service = menuService;
  }

  async dragAndDrop(req, res) {
    await this.service.dragAndDrop(req.body, req.query);
    return res.status(200).send('Ok');
  }

  async deleteDiscount(req, res) {
    const result = await this.service.deleteDiscount(req.params.id, req.body);
    if (result.matchedCount == 0) {
      res.status(404).send('Sorry, we cannot find that!');
    }
    res.send(result);
  }
}

module.exports = MenuController;
