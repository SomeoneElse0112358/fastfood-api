const CommonController = require('../common.controller');
const { user: UserService } = require('../../services/user');
const userService = new UserService();

class UserController extends CommonController {
  constructor() {
    super(userService);
    this.service = userService;
  }

  async bonusesCheck(req, res) {
    const checkResult = await this.service.bonusesCheck(req.params.id);
    if (checkResult == null && checkResult !== undefined) {
      return res.status(404).send('Sorry, we cannot find that!');
    }
    return res.send(checkResult);
  }

  async subscribeTo(req, res) {
    const result = await this.service.subscribeTo(req.params.id);
    if (result == null) {
      return res.status(404).send('Sorry, we cannot find that!');
    }
    return res.send('Success!');
  }

  async unsubsribeFrom(req, res) {
    const result = await this.service.unsubsribeFrom(req.params.id);
    if (result == null) {
      return res.status(404).send('Sorry, we cannot find that!');
    }
    return res.send('Success!');
  }
}

module.exports = UserController;
