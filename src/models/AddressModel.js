const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  receiver: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  primary: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
