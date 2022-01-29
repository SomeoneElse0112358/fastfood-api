const moment = require('moment');
const { order, promoCode, user, menu } = require('../../models');
const Checking = require('../../helpers/checking');
const checking = new Checking();
const CommonService = require('../common.service');

class OrderService extends CommonService {
  constructor() {
    super(order);
    this.orderModel = order;
    this.promocodeModel = promoCode;
    this.userModel = user;
    this.menuModel = menu;
  }

  dishPriceCheck(dish) {
    if (dish.discount && dish.discount) {
      return dish.priceWithDiscount;
    }
    return dish.price;
  }

  async #findSum(order) {
    return await Promise.resolve(
      order.reduce(async function getSum(prev1, curr) {
        const prev = await prev1;
        const dishesPrice = dishPriceCheck(
          await this.menuModel.findOne({ id: curr })
        );

        return prev + dishesPrice;
      }, 0)
    );
  }

  async #findSumWithPromocodeAndBonuses(currentOrder) {
    const user = await this.userModel.findOne({ id: currentOrder.user });
    const promocode = await this.promocodeModel.findOne({
      id: currentOrder.promocode
    });
    const [maxNumberOfOrder] = await this.orderModel
      .find()
      .sort({ numberOfOrder: -1 })
      .limit(1);

    if (currentOrder.promocode && !currentOrder.usedBonuses) {
      return {
        ...currentOrder,
        finalSum: (
          (currentOrder.sum * (100 - promocode.percent)) /
          100
        ).toFixed(2),
        numberOfOrder: maxNumberOfOrder?.numberOfOrder
          ? 1
          : maxNumberOfOrder.numberOfOrder + 1
      };
    } else if (currentOrder.usedBonuses && !currentOrder.promocode) {
      return {
        ...currentOrder,
        finalSun: currentOrder.sum - currentOrder.usedBonuses,
        numberOfOrder: maxNumberOfOrder?.numberOfOrder
          ? 1
          : maxNumberOfOrder.numberOfOrder + 1
      };
    } else if (currentOrder.promocode && currentOrder.usedBonuses) {
      return {
        ...currentOrder,
        finalSum: (
          (currentOrder.sum * (100 - promocode.percent)) / 100 -
          currentOrder.usedBonuses
        ).toFixed(2),
        numberOfOrder: maxNumberOfOrder?.numberOfOrder
          ? 1
          : maxNumberOfOrder.numberOfOrder + 1
      };
    }

    if (currentOrder.usedBonuses) {
      await this.userModel.updateOne(
        { id: currentOrder.user },
        {
          bonus: user.bonuses - currentOrder.usedBonuses
        }
      );
    }

    return {
      ...currentOrder,
      numberOfOrder: maxNumberOfOrder?.numberOfOrder
        ? 1
        : maxNumberOfOrder.numberOfOrder + 1,

      sum: await this.#findSum(currentOrder.dishes),
      finalSum: currentOrder.sum
    };
  }

  async #promocodeAndBonusesCheck(currentOrder) {
    const user = await this.userModel.findOne({ id: currentOrder.user });
    const promocode = await this.promocodeModel.findOne({
      id: currentOrder.promocode
    });
    const currentDate = moment().utc().format();
    const orders = await this.orderModel.find({
      user: currentOrder.user,
      promocode: currentOrder.promocode
    });

    if (currentOrder.usedBonuses < 0) {
      return null;
    } else if (user.bonuses - currentOrder.usedBonuses < 0) {
      return null;
    } else if (
      (await this.#findSum(currentOrder.dishes)) / 2 <
      currentOrder.usedBonuses
    ) {
      return null;
    } else if (!promocode && currentOrder.promocode) {
      return null;
    } else if (currentOrder.promocode && currentDate > promocode.finalDate) {
      return null;
    } else if (currentOrder.promocode && promocode.startDate > currentDate) {
      return null;
    } else if (
      currentOrder.promocode &&
      orders.length >= promocode.numberOfUses
    ) {
      return null;
    }
    return currentOrder;
  }

  async create(body) {
    if ((await this.#promocodeAndBonusesCheck(body)) === null) {
      return null;
    } else if (checking.delivery(body) === null) {
      return null;
    } else {
      await this.#findSumWithPromocodeAndBonuses(body);
      return super.create(body);
    }
  }

  async getList(filter) {
    const result = await order
      .find(
        checking.filter({
          user: filter.user,
          numberOfOrder: filter.numberOfOrder
        }),
        { _id: 0, __v: 0 }
      )
      .populate({ path: 'user', select: { _id: 0, __v: 0 } })
      .populate({
        path: 'dishes',
        populate: [
          { path: 'category', select: { _id: 0, __v: 0 } },
          { path: 'tags', select: { _id: 0, __v: 0 } }
        ],
        select: { _id: 0, __v: 0, position: 0 }
      })
      .populate({ path: 'promocode', select: { code: 1, _id: 0 } });
    return result;
  }
}

module.exports = OrderService;
