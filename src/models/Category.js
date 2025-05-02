const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,  // 🛠 ObjectId vì liên kết với Shop
    ref: 'Shop',
    required: true,
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

// module.exports = mongoose.model('Category', CategorySchema, 'categories');
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

