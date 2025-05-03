const mongoose = require('mongoose');

const ProductAttributionSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  category_attribution_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryAttribution',
    required: true,
  },
  value: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

module.exports = mongoose.model('ProductAttribution', ProductAttributionSchema, 'productattributions');
