const mongoose = require('mongoose');

const ProductVariantSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  attributes: [
    {
      category: { type: String, required: true },
      value: { type: String, required: true },
    }
  ],
  attribution_ids:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attribution',
      required: true,
    }
  ],
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  barcode: { type: Number },
  sale_quantity: { type: Number, default: 0 },
  image: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ProductVariant', ProductVariantSchema);
