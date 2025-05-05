const Order = require("../models/Order");

const createOrder = async (orderData) => {
  try {
    const createdOrder = await Order.create(orderData);
    // Populate các trường ngay sau khi tạo
    const fullOrder = await Order.findById(createdOrder._id)
      .populate("product.product_id")
      .populate("customer_id")
      .populate("address_id")
      .populate("voucher_id")
      .populate("shipment_id")
      .populate("payment_method_id");

    return {
      status: "OK",
      message: "Order created successfully",
      data: fullOrder,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const getOrdersByCustomerId = async (customer_id) => {
  try {
    const orders = await Order.find({ customer_id })
      .populate("product.product_id")
      .populate("customer_id")
      .populate("address_id")
      .populate("voucher_id")
      .populate("shipment_id")
      .populate("payment_method_id");

    return {
      status: "OK",
      message: "Fetched user's orders",
      data: orders,
    };
  } catch (e) {
    return {
      status: "ERR",
      message: e.message,
    };
  }
};

module.exports = { createOrder, getOrdersByCustomerId };
