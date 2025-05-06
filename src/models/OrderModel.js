const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
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
        total_price: { type: Number, required: true }
    },
    {
        timestamps: true,
    }
);

const OrderAdmin = mongoose.model('OrderAdmin', orderSchema);

module.exports = OrderAdmin;
