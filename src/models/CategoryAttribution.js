const mongoose = require('mongoose');

const CategoryAttributionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

module.exports = mongoose.model('CategoryAttribution', CategoryAttributionSchema, 'categoryattributions');
