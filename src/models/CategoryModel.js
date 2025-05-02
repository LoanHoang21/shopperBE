const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop', // 👈 thêm dòng này
  },
  type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryType',
  },
  
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});
module.exports = mongoose.model('Category', categorySchema);
