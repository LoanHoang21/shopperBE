const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
module.exports = PaymentMethod;
