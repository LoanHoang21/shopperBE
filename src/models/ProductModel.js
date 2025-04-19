const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  sale_quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  short_description: { type: String },
  description: { type: String },
  view_count: { type: Number, default: 0 },
  rating_avg: { type: Number, default: 0 },
  image: { type: String },
  barcode_id: { type: Number },
  category_id: { type: Number },
  deleted_at: { type: Date, default: null }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
