const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: { type: Number, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema(
    {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: {
            type: [productOrderSchema],
            required: true,
            validate: [val => val.length > 0, 'Order must have at least one product']
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'shipped', 'delivered', 'completed', 'cancelled'],
            default: 'pending'
        },
        voucher_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Voucher',
            // required: true
        },
        total_price: {type: Number},
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
