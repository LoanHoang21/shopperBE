const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: function () {
      return new mongoose.Types.ObjectId(); // 👈 Cho phép tự động sinh id
    },
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 👈 nếu user chính là customer
    required: true
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

module.exports = mongoose.model('Cart', cartSchema);
