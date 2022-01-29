const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Menus', required: true }],
    sum: { type: Number },
    finalSum: { type: Number },
    usedBonuses: { type: Number },
    bonusesOfOrder: { type: Number },
    promocode: { type: Schema.Types.ObjectId, ref: 'Promocodes' },
    numberOfOrder: { type: Number },
    deliveryMethod: {
      type: String,
      required: true,
      enum: ['Take away', 'Delivery']
    },
    timeOfDelivery: { type: String },
    address: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Orders', ordersSchema);
