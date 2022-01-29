const autoBind = require('auto-bind');

class CommonController {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async create(req, res) {
    const result = await this.service.create(req.body);
    if (result == null) {
      res
        .status(400)
        .send(
          'The input contains invalid data or name (email) has been exist!'
        );
    }
    return res.status(201).send(result);
  }

  async getOne(req, res) {
    const result = await this.service.getOne(req.params.id);
    if (result == null) {
      return res.status(404).send('Sorry, we cannot find that!');
    }
    return res.send(result);
  }

  async update(req, res) {
    const result = await this.service.update(req.params.id, req.body);
    if (result == null) {
      return res
        .status(400)
        .send(
          'The input contains invalid data or name (email) has been exist)!'
        );
    } else if (result.matchedCount == 0) {
      return res.status(404).send('Sorry, we cannot find that!');
    }
    return res.status(200).send('Ok');
  }

  async delete(req, res) {
    const result = await this.service.delete(req.params.id);
    if (result == null) {
      return res.status(404).send('Sorry, we cannot find that!');
    }
    return res.send(result);
  }

  async getList(req, res) {
    const result = await this.service.getList(req.query);
    if (result == null) {
      return res.status(404).send('Sorry, we cannot find that!');
    }
    return res.send(result);
  }
}

module.exports = CommonController;
