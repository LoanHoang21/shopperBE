const mongoose = require('mongoose');

const VoucherSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String },
    discount_type: { type: String, enum: ['Phần trăm', 'Số tiền'], required: true },
    discount_value: { type: Number, required: true },
    min_order_value: { type: Number, default: 0 },
    max_discount_value: { type: Number },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    max_user: { type: Number, default: 0 },
    user_count: { type: Number, default: 0 },
    type: { type: String, default: 'Shopper' },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', default: null } // <<< thêm dòng này
}, { timestamps: true });


module.exports = mongoose.model('Voucher', VoucherSchema);
