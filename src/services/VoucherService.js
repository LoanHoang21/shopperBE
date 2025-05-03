const Voucher = require("../models/VoucherModel");
const admin = require("../config/firebase");

const getAllVoucher = async () => {
  try {
    let vouchers = await Voucher.find({ deleted_at: null }).sort({ _id: -1 });
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

const createNotiOrder = async (data) => {
  // senderId, receiveId, orderId, name, image, description,
  try {
    console.log(data);
    const notiOrder = await Noti.create({
      sender_id: data.senderId,
      receiver_id: data.receiveId,
      order_id: data.orderId,
      name: data.name,
      image: data.image,
      description: data.description,
    });
    if (notiOrder) {
      // Gửi push notification nếu có fcmToken
      if (data.fcmToken) {
        const message = {
          // token: data.fcmToken,
          token: 'dh46avSoTVCgmdfk4SDXYu:APA91bFgq6XoC0Z6WdnFaNXa3SnIal35XWhW4XG-5HuaIEUAkor4bqJwU9f59OkaPDOMXewtbKpnZKYYJcPennloST1DEBDvvuTrVJpcDoZmI2UY32i78LM',
          notification: {
            title: data.name || "Thông báo mới",
            body: data.description || "",
          },
          data: {
            orderId: data.orderId || "",
            senderId: data.senderId || "",

          },
        };

        try {
          await admin.messaging().send(message);
          console.log("Push notification sent successfully.");
        } catch (fcmError) {
          console.error("Error sending FCM notification:", fcmError);
        }
      }

      return {
        EM: "Tạo thông báo đơn hàng thành công",
        EC: 0,
        DT: notiOrder,
      };
    } else {
      return {
        EM: "Tạo thông báo đơn hàng thất bại",
        EC: 0,
        DT: notiOrder,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
      DT: [],
    };
  }
};

const updateNotiType = async (data) => {
  try {
    const updatedNotiType = await NotiType.findOneAndUpdate(
      { _id: data.id, deleted_at: null },
      {
        image: data.image,
        description: data.description,
        status: data.status,
      },
      { new: true } // trả về document mới sau khi cập nhật
    );

    if (updatedNotiType) {
      return {
        EM: "Cập nhật loại thông báo thành công",
        EC: 0,
        DT: updatedNotiType,
      };
    } else {
      return {
        EM: "Không tìm thấy loại thông báo cần cập nhật",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("Error in updateNotiType:", error);
    return {
      EM: "Đã xảy ra lỗi khi cập nhật loại thông báo",
      EC: -2,
      DT: [],
    };
  }
};

const deleteNotiType = async (id) => {
  try {
    const updatedNotiType = await NotiType.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true }
    );

    if (updatedNotiType) {
      return {
        EM: "Đánh dấu loại thông báo là đã xóa thành công",
        EC: 0,
        DT: updatedNotiType,
      };
    } else {
      return {
        EM: "Không tồn tại loại thông báo cần đánh dấu xóa",
        EC: 0,
        DT: [],
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

const getDetailsNotiType = async (id) => {
  try {
    const notiType = await NotiType.findOne({
      _id: id,
      deleted_at: null,
    });
    if (notiType) {
      return {
        EM: "Lấy thông tin loại thông báo thành công",
        EC: 0,
        DT: notiType,
      };
    } else {
      return {
        EM: "Không tìm thấy loại thông báo",
        EC: 0,
        DT: notiType,
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
  getAllVoucher,
  createNotiOrder,
  updateNotiType,
  deleteNotiType,
  getDetailsNotiType,
};
