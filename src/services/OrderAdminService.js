// const User = require("../models/UserModel");
// const NotiType = require("../models/NotiTypeModel");
const Order = require("../models/OrderModel");

const getAllOrderById = async (customerId) => {
  // console.log(customerId);
  try {
    let orders = await Order.find({ customer_id: customerId, deleted_at: null })
                .populate('products.product_id') // Nếu bạn muốn lấy thông tin đầy đủ của sản phẩm
                .sort({ created_at: -1 }); // Sắp xếp đơn hàng mới nhất trước
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

// const createNotiType = async (data) => {
//     try {
//         await NotiType.create({
//           image: data.image,
//           name: data.name,
//           description: data.description,
//           status: data.status,
//         })
//     } catch (error) {
//         console.log(error);
//         return {
//             EM: "Something wrongs in service...",
//             EC: -2,
//             DT: [],
//           };
//     }
// };

const updateStatusOrder = async (orderId, data) => {
  console.log(orderId);
  try {
    const updated = await Order.findOneAndUpdate(
      { _id: orderId},
      {
        status: data.status,
      },
      { new: true } // trả về document mới sau khi cập nhật
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


// const deleteNotiType = async (id) => {
//   try {
//     const updatedNotiType = await NotiType.findByIdAndUpdate(
//       id,
//       { deleted_at: new Date() },
//       { new: true }
//     );

//     if (updatedNotiType) {
//       return {
//         EM: "Đánh dấu loại thông báo là đã xóa thành công",
//         EC: 0,
//         DT: updatedNotiType,
//       };
//     } else {
//       return {
//         EM: "Không tồn tại loại thông báo cần đánh dấu xóa",
//         EC: 0,
//         DT: [],
//       };
//     }
//   } catch (e) {
//     console.log(e);
//     return {
//         EM: "Something wrongs in service...",
//         EC: -2,
//         DT: [],
//       };
//   }
// };

// const getDetailsNotiType = async (id) => {
//   try {
//     const notiType = await NotiType.findOne({
//       _id: id,
//       deleted_at: null,
//     });
//     if(notiType){
//       return {
//         EM: "Lấy thông tin loại thông báo thành công",
//         EC: 0,
//         DT: notiType,
//       };
//     }else {
//       return {
//         EM: "Không tìm thấy loại thông báo",
//         EC: 0,
//         DT: notiType,
//       };
//     }
//   } catch (e) {
//     console.log(e);
//     return {
//       EM: "Something wrongs in service...",
//       EC: -2,
//       DT: [],
//     };
//   }
// }

const getAllOrder = async () => {
  try {
    let orders = await Order.find()
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
        EM: "Lấy danh sách tất cả đơn hàng thành công",
        EC: 0,
        DT: orders,
      };
    } else {
      return {
        EM: "Danh sách tất cả đơn hàng trống",
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

module.exports = {
  getAllOrderById,
  // createNotiType,
  updateStatusOrder,
  getAllOrder,
  // deleteNotiType,
  // getDetailsNotiType,
};
