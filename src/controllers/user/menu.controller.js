const CommonController = require('../common.controller');
const { menu: MenuService } = require('../../services/user');
const menuService = new MenuService();

class MenuController extends CommonController {
  constructor() {
    super(menuService);
    this.service = menuService;
  }

  async getOne(req, res) {
    const result = await this.service.getOne(req.params.link);
    if (result == null) {
      return res.status(404).send('Sorry, we cannot find that!');
    }
    return res.send(result);
  }
}

module.exports = MenuController;
