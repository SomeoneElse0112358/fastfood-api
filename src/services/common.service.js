class CommonService {
  constructor(model) {
    this.model = model;
  }

  async create(body) {
    const createResult = await this.model.create(body);
    return createResult;
  }

  async getOne(id) {
    const foundResult = await this.model.findOne({ _id: id });
    return foundResult;
  }

  async update(id, body) {
    const updateResult = await this.model.updateOne({ _id: id }, body);
    return updateResult;
  }

  async delete(id) {
    const deleteResult = await this.model.findOneAndDelete({ _id: id });
    return deleteResult;
  }

  async getList(filter = {}, select = {}) {
    const foundResult = this.model.find(filter, select);
    return foundResult;
  }
}

module.exports = CommonService;
