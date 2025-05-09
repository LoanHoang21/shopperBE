const Voucher = require("../models/VoucherModel");

const getAllVoucher = async () => {
  try {
    let vouchers = await Voucher.find({ deleted_at: null }).sort({ end_date: -1 });
    if (vouchers) {
      return {
        EM: "Lấy danh sách tất cả voucher thành công",
        EC: 0,
        DT: vouchers,
      };
    } else {
      return {
        EM: "Danh sách voucher trống",
        EC: 0,
        DT: vouchers,
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

// const updateNotiType = async (data) => {
//   try {
//     const updatedNotiType = await NotiType.findOneAndUpdate(
//       { _id: data.id, deleted_at: null },
//       {
//         image: data.image,
//         description: data.description,
//         status: data.status,
//       },
//       { new: true } // trả về document mới sau khi cập nhật
//     );

//     if (updatedNotiType) {
//       return {
//         EM: "Cập nhật loại thông báo thành công",
//         EC: 0,
//         DT: updatedNotiType,
//       };
//     } else {
//       return {
//         EM: "Không tìm thấy loại thông báo cần cập nhật",
//         EC: 0,
//         DT: [],
//       };
//     }
//   } catch (error) {
//     console.log("Error in updateNotiType:", error);
//     return {
//       EM: "Đã xảy ra lỗi khi cập nhật loại thông báo",
//       EC: -2,
//       DT: [],
//     };
//   }
// };

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
//       EM: "Something wrongs in service...",
//       EC: -2,
//       DT: [],
//     };
//   }
// };

// const getDetailsNotiType = async (id) => {
//   try {
//     const notiType = await NotiType.findOne({
//       _id: id,
//       deleted_at: null,
//     });
//     if (notiType) {
//       return {
//         EM: "Lấy thông tin loại thông báo thành công",
//         EC: 0,
//         DT: notiType,
//       };
//     } else {
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
// };

module.exports = {
  getAllVoucher,
  // updateNotiType,
  // deleteNotiType,
  // getDetailsNotiType,
};
