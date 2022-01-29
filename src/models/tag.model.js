const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = Schema({
  name: { type: String, required: true },
  link: { type: String, index: { unique: true } }
});

module.exports = mongoose.model('Tags', tagsSchema);
