const mongoose = require('mongoose');
const Order = require("../models/Order");
const Category = require('../models/CategoryModel');
const Product = require("../models/ProductModel");

const getAllOrderById = async (customerId) => {
  try {
    let orders = await Order.find({ customer_id: customerId, deleted_at: null })
                .populate('products.product_id')
                .sort({ created_at: -1 });
    if (orders) {
      return {
        EM: "Lấy danh sách đơn hàng theo id khách hàng thành công",
        EC: 0,
        DT: orders,
      };
    } else {
      return {
        EM: "Danh sách đơn hàng theo id khách hàng trống",
        EC: 0,
        DT: orders,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
      DT: [],
    };
  }
};

const updateStatusOrder = async (orderId, data) => {
  console.log(orderId);
  try {
    const updated = await Order.findOneAndUpdate(
      { _id: orderId},
      {
        status: data.status,
      },
      { new: true }
    );

    if (updated) {
      return {
        EM: "Cập nhật trạng thái đơn hàng thành công",
        EC: 0,
        DT: updated,
      };
    } else {
      return {
        EM: "Không tìm thấy đơn hàng cần cập nhật",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("Error in updated:", error);
    return {
      EM: "Đã xảy ra lỗi khi cập nhật đơn hàng",
      EC: -2,
      DT: [],
    };
  }
};

const getAllOrder = async (shopId) => {
  try {
    let orders = await Order.find({shop_id: shopId, deletedAt: null})
                .populate({
                  path: 'products.product_id', // populate ProductVariant
                  select: '_id product_id attribution_ids image',
                  populate: {
                    path: 'product_id', // trong ProductVariant, populate tiếp Product
                    model: 'Product',
                    select: 'name',
                    // populate: {
                    //   path: 'attribution_ids', // cấp 3: Attribute
                    //   model: 'Attribution',
                    //   select: 'name category_attribution_id'
                    //   populate: {
                    //     path: 'category_attribution_id',
                    //     model: 'CategoryAttribution',
                    //   }
                    // }
                  }
                })
                .sort({ updatedAt: -1 });
    if (orders) {
      return {
        EM: "Lấy danh sách tất cả đơn hàng theo shop thành công",
        EC: 0,
        DT: orders,
      };
    } else {
      return {
        EM: "Danh sách tất cả đơn hàng theo shop trống",
        EC: 0,
        DT: orders,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
      DT: [],
    };
  }
};

const getAllCustomer = async (shopId) => {
  try {
    // Lấy tất cả đơn hàng theo shop_id
    let orders = await Order.find({ 
      shop_id: shopId,
      deletedAt: null 
    });

    // Đếm số lượng đơn hàng theo customer_id
    const customerOrderCount = orders.reduce((acc, order) => {
      const customerId = order.customer_id.toString();  // Chuyển đổi ObjectId thành chuỗi để nhóm
      if (acc[customerId]) {
        acc[customerId] += 1;  // Nếu customer_id đã có trong acc, tăng số lượng
      } else {
        acc[customerId] = 1;  // Nếu chưa có, khởi tạo số lượng là 1
      }
      return acc;
    }, {});

    // Chuyển đổi kết quả thành mảng
    const result = Object.keys(customerOrderCount).map(customerId => ({
      customer_id: customerId,
      orderCount: customerOrderCount[customerId],
    }));

    return {
      EM: "Lấy danh sách đơn hàng theo shop và đếm theo customer_id thành công",
      EC: 0,
      DT: result,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrong in service...",
      EC: -2,
      DT: [],
    };
  }
};

// const getAllProduct = async (shopId) => {
//   try {
//     // Lấy danh sách Category theo shop_id và deleted_at
//     let categories = await Category.find({ shop_id: shopId, deleted_at: null });

//     if (!categories || categories.length === 0) {
//       return {
//         EM: "Không có danh mục nào cho shop này",
//         EC: 0,
//         DT: [],
//       };
//     }

//     // Duyệt qua từng category_id để lấy danh sách sản phẩm theo category_id
//     let products = [];
//     for (let category of categories) {
//       let categoryProducts = await Product.find({ category_id: category._id });

//       if (categoryProducts.length > 0) {
//         products.push(...categoryProducts); // Gộp tất cả sản phẩm vào mảng
//       }
//     }

//     return {
//       EM: "Lấy danh sách sản phẩm theo shop_id và category thành công",
//       EC: 0,
//       DT: products,
//     };
//   } catch (e) {
//     console.log(e);
//     return {
//       EM: "Có lỗi xảy ra trong service...",
//       EC: -2,
//       DT: [],
//     };
//   }
// };

module.exports = {
  getAllOrderById,
  updateStatusOrder,
  getAllOrder,
  getAllCustomer,
  // getAllProduct,
};
