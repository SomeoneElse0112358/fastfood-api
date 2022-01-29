const moment = require('moment');
const xlsx = require('xlsx');
const { order, user, menu, promoCode } = require('../../models');
const Checking = require('../../helpers/checking');
const CommonService = require('../common.service');
const checking = new Checking();

class OrderService extends CommonService {
  constructor() {
    super(order, user, menu, promoCode);
    this.orderModel = order;
    this.userModel = user;
    this.menuModel = menu;
    this.promoCodeModel = promoCode;
  }

  async getList(filter) {
    const result = await order
      .find(
        checking.filter({
          user: filter.user,
          numberOfOrder: filter.numberOfOrder
        })
      )
      .populate({ path: 'user', select: { password: 0 } })
      .populate({
        path: 'dishes',
        populate: [{ path: 'category' }, { path: 'tags' }]
      })
      .populate('promocode');
    return result;
  }

  async getExcel(filter) {
    const data = await this.orderModel
      .find({
        updatedAt: { $gte: new Date(filter.from), $lte: new Date(filter.to) }
      })
      .populate({ path: 'user', select: { password: 0 } })
      .populate({
        path: 'dishes',
        populate: [{ path: 'category' }, { path: 'tags' }]
      })
      .populate('promocode');
    const dataInfo = data.map((el) => {
      return [
        el.user.firstName,
        el.user.lastName,
        el.sum,
        el.finalSum,
        moment(el.updatedAt).format('LLL')
      ];
    });

    const workSheetColumnName = [
      'First name',
      'Last name',
      'Sum',
      'Final sum',
      'Date'
    ];
    const workBook = xlsx.utils.book_new();
    const workSheetData = [workSheetColumnName, ...dataInfo];
    const workSheet = xlsx.utils.json_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet);
    return xlsx.write(workBook, { bookType: 'xlsx', type: 'binary' });
  }
}

module.exports = OrderService;
