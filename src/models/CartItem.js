const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cart' },        
  product_id: { 
    type: Schema.Types.ObjectId,                        
    ref: 'Product',                                     
    required: true 
  },
  quantity: { type: Number, required: true, default: 1 },
  attributions: {
    type: Array,
    default: []
  },
  variant_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ProductVariant',
    required: true
  },
  isSelected: { type: Boolean, default: false },         
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});


module.exports = mongoose.model('CartItem', CartItemSchema, 'cartItems');
