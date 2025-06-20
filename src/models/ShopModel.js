const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  phone: { type: String },
  location: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
});

// module.exports = mongoose.model('Shop', shopSchema);
// const Shop = mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;

