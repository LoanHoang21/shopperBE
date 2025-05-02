const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  customer_id: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

module.exports = mongoose.model('Cart', cartSchema);
