const slugify = require('slugify');
const { category } = require('../../models');
const CommonService = require('../../services/common.service');

class CategoryService extends CommonService {
  constructor() {
    super(category);
    this.model = category;
  }
  async create(body) {
    if (await this.model.findOne({ name: body.name })) return null;
    return super.create({ ...body, link: slugify(body.name) });
  }

  async update(id, body) {
    if (await this.model.findOne({ name: body.name })) return null;
    return super.update(id, { ...body, link: slugify(body.name) });
  }
}

module.exports = CategoryService;
