const bcrypt = require('bcrypt');
const moment = require('moment');
const salt = bcrypt.genSaltSync(10);
const { user, order } = require('../../models');
const { emailOfSendler } = require('../../config');
const sendMail = require('../../helpers/mailer');
const CommonService = require('../common.service');

class UserService extends CommonService {
  constructor() {
    super(user, order);
    this.userModel = user;
    this.orderModel = order;
  }
  #emailContent(name, template) {
    return {
      subject: 'Notification about subscription',
      text: `Dear, ${name}, You are ${template} newsletter`
    };
  }

  async getOne(id) {
    const foundResult = await this.userModel.findOne(
      { _id: id },
      { _id: 0, __v: 0 }
    );
    return foundResult;
  }

  async update(id, body) {
    if (body.password)
      return super.update(id, {
        ...body,
        password: bcrypt.hashSync(body.password, salt)
      });
    return super.update(id, body);
  }

  async bonusesCheck(id) {
    if ((await this.userModel.findOne({ _id: id })) == null) {
      return null;
    }
    const orders = await this.orderModel.find({ user: id });
    const addUserBonuses = orders.forEach(async (currentOrder) => {
      const bonus = (currentOrder.finalSum / 10).toFixed(2);
      if (
        moment(currentOrder.updatedAt.toISOString())
          .add(10, 's')
          .utc()
          .format() < moment().utc().format() &&
        currentOrder.bonusesOfOrder == undefined
      ) {
        await this.userModel.findOneAndUpdate(
          { _id: id },
          { $inc: { bonuses: bonus } }
        );
        await this.orderModel.updateMany(
          { user: id },
          { bonusesOfOrder: bonus }
        );
      }
    });
    return addUserBonuses;
  }

  async subscribeTo(id) {
    const userInfo = await this.userModel.findOne({ _id: id });
    if (!userInfo) {
      return null;
    } else if (userInfo.subscription !== undefined) {
      sendMail(
        `"Administrator" <${emailOfSendler}>`,
        userInfo.email,
        this.#emailContent(userInfo.firstName, 'already subscribed to')
      );
    }
    const subscribeResult = await this.userModel.findOneAndUpdate(
      { _id: id },
      { subscription: 'Yes' }
    );
    sendMail(
      `"Administrator" <${emailOfSendler}>`,
      userInfo.email,
      this.#emailContent(userInfo.firstName, 'successfully subscribe to')
    );
    return subscribeResult;
  }

  async unsubsribeFrom(id) {
    const userInfo = await this.userModel.findOne({ _id: id });
    if (!userInfo) {
      return null;
    } else if (!userInfo.subscription) {
      sendMail(
        `"Administrator" <${emailOfSendler}>`,
        userInfo.email,
        this.#emailContent(userInfo.firstName, 'already unsubscribe from')
      );
    }
    const unsubscribeResult = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $unset: { subscription: 1 } }
    );
    sendMail(
      `"Administrator" <${emailOfSendler}>`,
      userInfo.email,
      this.#emailContent(userInfo.firstName, 'successfully unsubscribe from')
    );
    return unsubscribeResult;
  }
}

module.exports = UserService;
