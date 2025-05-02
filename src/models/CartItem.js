const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  id: { type: Number, required: true, unique: true },    // ID cartitem
  cartId: { type: Number, required: true },              // ID của giỏ hàng
  product_id: { 
    type: Schema.Types.ObjectId,                         // Sửa thành ObjectId
    ref: 'Product',                                      // Reference đến bảng Product
    required: true 
  },
  quantity: { type: Number, required: true, default: 1 }, // Số lượng sản phẩm
  isSelected: { type: Boolean, default: true },          // Có được chọn hay không
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

// Ghi rõ tên collection là 'cartitems' (Mongo mặc định viết thường và thêm 's')
module.exports = mongoose.model('CartItem', CartItemSchema, 'cartItems');
