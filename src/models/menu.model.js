const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bucket = 'https://restaurant-testproject.s3.amazonaws.com/';

const menuSchema = Schema({
  name: { type: String, required: true },
  link: { type: String, index: { unique: true } },
  price: { type: Number, required: true },
  discount: { type: Number },
  priceWithDiscount: { type: Number },
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Categories' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
  description: { type: String },
  image: {
    type: String,
    get: (v) => `${bucket}${v}`
  },
  position: { type: Number }
});

module.exports = mongoose.model('Menus', menuSchema);
