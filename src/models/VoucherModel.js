const mongoose = require('mongoose')

const voucherSchema = new mongoose.Schema(
    {
        code: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        discount_type: { type: String, required: true },
        discount_value: { type: Number },
        min_order_value: { type: Number },
        max_discount_value: { type: Number },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        max_user: { type: Number, required: true },
        user_count: { type: Number, default: 0 },
        type_voucher: { type: String },
        type: { type: String, default: 'Shopper' },
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', default: null }
    },
    {
        timestamps: true,
    }
);
const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;