const { menu, tag, category } = require('../../models');
const CommonService = require('../common.service');

class MenuService extends CommonService {
  constructor() {
    super(menu, tag, category);
    this.menuModel = menu;
    this.tagModel = tag;
    this.categoryModel = category;
  }
  async #composeFilter(filter) {
    const currentTag = await this.tagModel.findOne({ link: filter.tags });
    const currentCategory = await this.categoryModel.findOne({
      link: filter.category
    });
    if (!filter.tags && !filter.category) {
      return {};
    } else if (!filter.category) {
      return { tags: currentTag.id };
    } else if (!filter.tags) {
      return { category: currentCategory.id };
    } else if (filter.tags && filter.category) {
      return { tags: currentTag.id, category: currentCategory.id };
    }
  }

  async getList(filter) {
    const result = await this.menuModel
      .find(
        await this.#composeFilter({
          tags: filter.tags,
          category: filter.category
        }),
        { position: 0, __v: 0, _id: 0, link: 0 }
      )
      .sort({ position: 1 })
      .populate({ path: 'tags', select: { _id: 0, __v: 0, link: 0 } })
      .populate({ path: 'category', select: { _id: 0, __v: 0, link: 0 } });
    return result;
  }

  async getOne(link) {
    const result = await menu
      .findOne({ link: link }, { position: 0, __v: 0, _id: 0, link: 0 })
      .populate({ path: 'tags', select: { _id: 0, __v: 0, link: 0 } })
      .populate({ path: 'category', select: { _id: 0, __v: 0, link: 0 } });
    return result;
  }
}

module.exports = MenuService;
