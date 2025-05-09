const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in_transit', 'delivered', 'failed'],
    default: 'pending',
  },
  shipper_name: {
    type: String,
    required: true,
  },
  shipper_phone: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Shipment = mongoose.model('Shipment', shipmentSchema);
module.exports = Shipment;
