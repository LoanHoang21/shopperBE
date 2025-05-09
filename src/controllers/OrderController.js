const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const {
      products,
      quantity,
      customer_id,
      address_id,
      voucher_id,
      shipment_id,
      payment_method_id,
      total_price,
    } = req.body;

    // Kiểm tra trường bắt buộc
    if (!products || !quantity || !customer_id || !address_id || !payment_method_id || !total_price) {
      return res.status(400).json({
        status: "ERR",
        message: "Missing required fields",
      });
    }

    const orderData = {
      products,
      quantity,
      customer_id,
      address_id,
      voucher_id,
      shipment_id,
      payment_method_id,
      total_price,
    };

    const result = await OrderService.createOrder(orderData);
    return res.status(result.status === "OK" ? 200 : 500).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Server error",
    });
  }
};

const getOrdersByCustomerId = async (req, res) => {
  const { customer_id } = req.params;
  const result = await OrderService.getOrdersByCustomerId(customer_id);
  return res.status(result.status === "OK" ? 200 : 500).json(result);
};

module.exports = {
  createOrder,
  getOrdersByCustomerId,
};
