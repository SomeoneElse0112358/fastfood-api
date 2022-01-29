const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: String },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  address: [{ type: String }],
  bonuses: { type: Number },
  subscription: { type: String }
});

module.exports = mongoose.model('Users', usersSchema);
