const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // ✅ Thêm dòng này
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReviewProduct', reviewSchema);
