const Order = require("../models/Order");
const ProductVariant = require('../models/ProductVariantModel');

const createOrder = async (orderData) => {
  try {
    // B1: Kiểm tra tồn kho
    for (const item of orderData.products) {
      const variant = await ProductVariant.findById(item.product_id);
      if (!variant) {
        console.log(`Không tìm thấy sản phẩm với ID: ${item.product_id}`);
        return {
          status: "ERR",
          message: `Không tìm thấy sản phẩm với ID: ${item.product_id}`,
        };
      }

      const availableStock = variant.quantity - variant.sale_quantity;
      if (availableStock < item.quantity) {
        console.log(`Sản phẩm "${variant._id}" không đủ hàng. Còn lại: ${availableStock}, bạn đặt: ${item.quantity}`);
        return {
          status: "ERR",
          message: `Sản phẩm "${variant._id}" không đủ hàng. Còn lại: ${availableStock}, bạn đặt: ${item.quantity}`,
        };
      }
    }

    // B2: Tạo đơn hàng
    const createdOrder = await Order.create(orderData);

    // ✅ B3: Tăng sale_quantity sau khi tạo đơn hàng thành công
    for (const item of orderData.products) {
      await ProductVariant.findByIdAndUpdate(
        item.product_id,
        { $inc: { sale_quantity: item.quantity } }
      );
    }

    // B4: Populate & trả dữ liệu
    const fullOrder = await Order.findById(createdOrder._id)
      .populate("products.product_id")
      .populate("customer_id")
      .populate("address_id")
      .populate("voucher_id")
      .populate("shipment_id")
      .populate("payment_method_id");

    return {
      status: "OK",
      message: "Đặt hàng thành công 1233",
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
    .populate({
      path: "products.product_id",
      populate: {
        path: "product_id",
        populate: {
          path: "category_id",
          populate: {
            path: "shop_id",
          },
        },
      },
    })
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

const getProductVariantsWithDetails = async (productRequests) => {
  const ids = productRequests.map(p => p.product_id);

  const variants = await ProductVariant.find({ _id: { $in: ids } })
    .populate({
      path: 'product_id',
      populate: {
        path: 'category_id',
        populate: {
          path: 'shop_id',
        },
      },
    });

  return productRequests.map(p => {
    const variant = variants.find(v => v._id.toString() === p.product_id);
    return {
      product_id: variant, // => đã chứa thông tin product, category và shop
      quantity: p.quantity,
      type: p.type
    };
  });
};

const updateOrderStatus = async (orderId, status) => {
  try {
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return { status: 'ERR', message: 'Invalid order status' };
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return { status: 'ERR', message: 'Order not found' };
    }

    return {
      status: 'OK',
      message: 'Order status updated successfully',
      data: updatedOrder,
    };
  } catch (err) {
    return { status: 'ERR', message: err.message };
  }
};


module.exports = { createOrder, getOrdersByCustomerId, getProductVariantsWithDetails, updateOrderStatus };
