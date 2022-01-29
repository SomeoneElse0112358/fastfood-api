const slugify = require('slugify');
const { menu } = require('../../models');
const CommonService = require('../common.service');

class MenuService extends CommonService {
  constructor() {
    super(menu);
    this.model = menu;
  }
  async create(body) {
    if (await this.model.findOne({ name: body.name })) return null;
    const [maxPosition] = await this.model
      .find({ category: body.category })
      .sort({ position: -1 })
      .limit(1);
    return super.create({
      ...body,
      position: isNaN(maxPosition?.position) ? 1 : maxPosition.position + 1,
      link: slugify(body.name),
      priceWithDiscount: !body.discount
        ? body.price
        : ((body.price * (100 - body.discount)) / 100).toFixed(2)
    });
  }

  async getOne(id) {
    const result = await this.model
      .findOne({ _id: id })
      .populate('tags')
      .populate('category');
    return result;
  }

  async update(id, body) {
    if (await this.model.findOne({ name: body.name })) return null;
    const result = await this.model.updateOne(
      { _id: id },
      {
        $set: {
          ...body,
          priceWithDiscount: !body.discount
            ? body.price
            : ((body.price * (100 - body.discount)) / 100).toFixed(2)
        }
      }
    );
    return result;
  }

  async getList() {
    const result = await this.model
      .find()
      .populate('tags')
      .populate('category')
      .sort({ position: 1 });
    return result;
  }

  async #resetPositions(filter) {
    const result = await this.model.find(filter);
    return Promise.all(
      result.map(async (doc, i) => {
        await this.updateDish(doc.id, { position: i + 1 });
      })
    );
  }

  async dragAndDrop({ from, to }, filter) {
    const fromCheck = await this.model.findOne({ _id: from });
    const toCheck = await this.model.findOne({ _id: to });

    if (!fromCheck)
      throw new ApiError(httpStatus.NOT_FOUND, `Item ${from} not found.`);
    if (!toCheck)
      throw new ApiError(httpStatus.NOT_FOUND, `Item ${to} not found.`);
    if (isNaN(fromCheck.position) || isNaN(toCheck.position))
      await this.#resetPositions(filter);
    const fromPosition = await this.model.findOne({ _id: from });
    const toPosition = await this.model.findOne({ _id: to });

    const direction = fromPosition.position > toPosition.position ? 1 : -1;
    await this.model.updateMany(
      {
        $and: [
          filter,
          {
            position: { [direction > 0 ? '$lt' : '$gt']: fromPosition.position }
          },
          {
            position: { [direction > 0 ? '$gte' : '$lte']: toPosition.position }
          }
        ]
      },
      { $inc: { position: direction } }
    );

    await this.update(fromPosition._id, { position: toPosition.position });
  }

  async deleteDiscount(id) {
    const updateResult = await this.model.updateOne(
      { _id: id },
      { $unset: { discount: 1, priceWithDiscount: 1 } }
    );
    return updateResult;
  }
}

module.exports = MenuService;
