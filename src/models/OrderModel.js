const mongoose = require("mongoose");

// Schema con cho từng sản phẩm trong đơn hàng
const productOrderSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: [productOrderSchema],
      required: true,
      validate: [
        (val) => val.length > 0,
        "Order must have at least one product",
      ],
    },
    quantity: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "delivered", "completed", "cancelled", "unpaid"],
      default: "pending",
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // sửa đúng theo model hiện tại của bạn
      required: true,
    },
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    voucher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voucher",
    },
    shipment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
    },
    payment_method_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },
    shop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    payment_status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    payUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
