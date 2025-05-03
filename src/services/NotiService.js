const Noti = require("../models/NotiModel");
const admin = require("../config/firebase");

const getAllNotiByReceiveId = async (receiverId) => {
  try {
    let countAllNotis = await Noti.countDocuments({
      receiver_id: receiverId,
      deleted_at: null
    });
    if (countAllNotis) {
      return {
        EM: "Lấy danh sách thông báo theo loại thông báo thành công",
        EC: 0,
        DT: countAllNotis,
      };
    } else {
      return {
        EM: "Danh sách thông báo theo loại thông báo trống",
        EC: 0,
        DT: countAllNotis,
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


const getAllNotiByNotiType = async (receiverId, notiTypeId) => {
  try {
    let notis = await Noti.find({
      receiver_id: receiverId,
      notitype_id: notiTypeId,
      deleted_at: null
    }).sort({ updatedAt: -1 });
    if (notis) {
      return {
        EM: "Lấy danh sách thông báo theo loại thông báo thành công",
        EC: 0,
        DT: notis,
      };
    } else {
      return {
        EM: "Danh sách thông báo theo loại thông báo trống",
        EC: 0,
        DT: notis,
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
      notitype_id: '68046110424a1ce38058d708',
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

const createNotiVoucher = async (data) => {
  // senderId, receiveId, name, image, description,
  try {
    console.log(data);
    const notiVoucher = await Noti.create({
      sender_id: data.senderId,
      receiver_id: data.receiveId,
      name: data.name,
      image: data.image,
      description: data.description,
      notitype_id: '6803d8e36fee1e8afa9eb5db',
    });
    if (notiVoucher) {
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
            // orderId: data.orderId || "",
            senderId: data.senderId || "",
            receiverId: data.receiveId || "",
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
        EM: "Tạo thông báo voucher thành công",
        EC: 0,
        DT: notiVoucher,
      };
    } else {
      return {
        EM: "Tạo thông báo voucher thất bại",
        EC: 0,
        DT: notiVoucher,
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

const updateStatusNoti = async (notiId, data) => {
  try {
    const updatedNoti= await Noti.findOneAndUpdate(
      { _id: notiId, deleted_at: null },
      {
        is_read: data.is_read,
      },
      { new: true } // trả về document mới sau khi cập nhật
    );

    if (updatedNoti) {
      return {
        EM: "Cập nhật trạng thái thông báo thành công",
        EC: 0,
        DT: updatedNoti,
      };
    } else {
      return {
        EM: "Không tìm thấy thông báo cần cập nhật",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("Error in updateNotiType:", error);
    return {
      EM: "Đã xảy ra lỗi khi cập nhật thông báo",
      EC: -2,
      DT: [],
    };
  }
};

const deleteNoti = async (id) => {
  try {
    const updatedNoti = await Noti.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true }
    );

    if (updatedNoti) {
      return {
        EM: "Đánh dấu thông báo là đã xóa thành công",
        EC: 0,
        DT: updatedNoti,
      };
    } else {
      return {
        EM: "Không tồn tại thông báo cần đánh dấu xóa",
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

const getDetailsNoti = async (id) => {
  try {
    const noti = await Noti.findOne({
      _id: id,
      deleted_at: null,
    });
    if (noti) {
      return {
        EM: "Lấy thông tin thông báo thành công",
        EC: 0,
        DT: noti,
      };
    } else {
      return {
        EM: "Không tìm thấy thông báo",
        EC: 0,
        DT: noti,
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
  getAllNotiByNotiType,
  createNotiOrder,
  updateStatusNoti,
  deleteNoti,
  getDetailsNoti,
  createNotiVoucher,
};
