const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promoCodesSchema = Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  percent: { type: Number, required: true },
  startDate: { type: String },
  finalDate: { type: String },
  numberOfUses: { type: Number }
});
module.exports = mongoose.model('Promocodes', promoCodesSchema);
