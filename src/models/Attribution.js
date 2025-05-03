const mongoose = require('mongoose');

const AttributionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category_attribution_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryAttribution',
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

module.exports = mongoose.model('Attribution', AttributionSchema, 'attributions');
