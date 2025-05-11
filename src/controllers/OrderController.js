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
      shop_id,
      payment_status,
      status
    } = req.body;

    // Kiểm tra trường bắt buộc
    if (!products || !quantity || !customer_id || !address_id || !payment_method_id || !total_price || !shop_id || !payment_status || !status) {
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
      shop_id,
      payment_status,
      status
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

const getProductVariants = async (req, res) => {
  try {
    const {products} = req.body;
    console.log(products);
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Danh sách sản phẩm không hợp lệ' });
    }

    const result = await OrderService.getProductVariantsWithDetails(products);

    res.status(200).json(result);
  } catch (err) {
    console.error('❌ Lỗi khi lấy thông tin product variants:', err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const result = await OrderService.updateOrderStatus(orderId, status);
  return res.status(result.status === 'OK' ? 200 : 500).json(result);
};

module.exports = {
  updateOrderStatus,
};


module.exports = {
  createOrder,
  getOrdersByCustomerId,
  getProductVariants,
  updateOrderStatus,
};
