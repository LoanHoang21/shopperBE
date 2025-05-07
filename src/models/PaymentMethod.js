const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['e-wallet', 'cod', 'bank'], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);
