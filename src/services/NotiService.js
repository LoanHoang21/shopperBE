const Noti = require("../models/NotiModel");
const User = require("../models/UserModel");
const admin = require("../config/firebase");
const mongoose = require('mongoose');
const cron = require('cron');

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
    }).sort({ createdAt: -1 });
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
  // senderId, receiverId, orderId, name, image, description, fcmToken
  try {
    console.log(">>>>>ress", data);
    const notiOrder = await Noti.create({
      sender_id: data.senderId,
      receiver_id: data.receiverId,
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
          token: data.fcmToken,
          // token: 'dh46avSoTVCgmdfk4SDXYu:APA91bFgq6XoC0Z6WdnFaNXa3SnIal35XWhW4XG-5HuaIEUAkor4bqJwU9f59OkaPDOMXewtbKpnZKYYJcPennloST1DEBDvvuTrVJpcDoZmI2UY32i78LM',
          notification: {
            image: data.image || "https://res.cloudinary.com/dr0ncakbs/image/upload/v1746369375/default_pyru0w.png",
            title: data.name || "Thông báo mới",
            body: data.description || "",
          },
          // thông tin cần thiết để điều hướng đến màn hình mong muốn
          data: {
            orderId: data.orderId || "",
            senderId: data.senderId || "",

          },
        };

        try {
          await admin.messaging().send(message);
          console.log("Push notification order sent successfully.");
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

const isExpiringVoucher = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = (end.getTime() - today.getTime()) / (1000 * 3600 * 24);
  return diff <= 3 && diff >= 0 && start <= today;
};

const checkQuantityUserVoucher = (maxUser, userCount) => {
  if(userCount>=maxUser)  return false;
  return true;
};

const createNotiVoucher = async (data) => {
  // receiverId, name, image, description, fcmToken
  // console.log(data.receiveId.toString(), data.name, data.image, data.description, data.fcmToken);
  try {
    const notiVoucher = await Noti.create({
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
          token: data.fcmToken,
          notification: {
            title: data.name || "Thông báo mới",
            body: data.description || "",
          },
          data: {
            // orderId: data.orderId || "",
            receiverId: data.receiveId.toString() || "",
          },
        };

        try {
          await admin.messaging().send(message);
          console.log("Push notification voucher sent successfully.");
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

let userVoucherJobs = {};

const checkAndNotifyExpiringVouchers = async (userId) => {
  try {
    // Lấy thông tin người dùng từ DB
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found!");
      return;
    }

    const res = await fetch('http://localhost:3001/api/voucher/getAll');
    const result = await res.json();

    if (result.EC === 0) {
      const vouchers = result.DT;

      const expiringVouchers = vouchers.filter(
        (voucher) =>
          isExpiringVoucher(voucher.start_date, voucher.end_date) &&
          checkQuantityUserVoucher(voucher.max_user, voucher.user_count)
      );

      if (expiringVouchers.length > 0) {
        const randomNames = [
          "Voucher sắp hết hạn!",
          "NẠP ĐẦY MÃ GIẢM GIÁ",
          "Mã giảm giá sắp hết hạn. Nhanh tay dùng ngay!",
          "Đừng bỏ lỡ ưu đãi này!",
          "Chỉ còn chút thời gian sử dụng voucher!",
        ];

        const randomDescs = [
          `✨Mã giảm 500K, 200K đã sẵn sàng\n🧡Video tung thêm mã giảm đến 50%\n🚀Muốn mua gì vào ngay bạn ơi!`,
          `🎫Còn voucher Xtra đến 1 Triệu\n🚛Cùng ưu đãi Freeship đến 300K`,
          `🧡Ngập tràn mã giảm 500K, 200K,...\n🔥Duy nhất hôm nay - Mua ngay!`,
        ];

        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
        const randomDesc = randomDescs[Math.floor(Math.random() * randomDescs.length)];
        const thumbnail = expiringVouchers[0]?.image || "";

        await createNotiVoucher({
          receiveId: user._id,
          name: randomName,
          image: thumbnail,
          description: randomDesc,
          fcmToken: user.fcm_token,
        });

        console.log("Tạo thông báo voucher sắp hết hạn thành công.");
      } else {
        console.log("Không có voucher nào sắp hết hạn.");
      }
    }
  } catch (err) {
    console.error("Lỗi khi kiểm tra và tạo thông báo voucher:", err);
  }
};

// Start the cron job for user
const startUserVoucherJob = (userId) => {
  if (userVoucherJobs[userId]) {
    console.log("Job already running for this user!");
    return;
  }

  // const job = new cron.CronJob('*/2 * * * *', () => {
  const job = new cron.CronJob('*/30 * * * * *', () => {
    checkAndNotifyExpiringVouchers(userId);
  });

  job.start();
  userVoucherJobs[userId] = job;
  console.log(`Started job for user ${userId}`);
};

// Stop the cron job for user
const stopUserVoucherJob = (userId) => {
  const job = userVoucherJobs[userId];
  if (job) {
    job.stop();
    delete userVoucherJobs[userId];
    console.log(`Stopped job for user ${userId}`);
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

const getAllNotiByAdminAndNotiType = async (senderId, notiTypeId) => {
  try {
    let query = {
      notitype_id: notiTypeId,
      deleted_at: null,
      $or: [
        { sender_id: senderId },
        { sender_id: null }
      ]
    };
    let notis = await Noti.find(query).sort({ updatedAt: -1 });
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

const getAllNotiBySenderIdAndNotiType = async (senderId, notiTypeId) => {
  try {
    let notis = await Noti.find({
      sender_id: senderId,
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

const getNotiUpdateOrder = async (receiverId, notitypeId) => {
  try {
    const groupNotis = await Noti.aggregate([
      {
        $match: {
          receiver_id: new mongoose.Types.ObjectId(receiverId),
          notitype_id: new mongoose.Types.ObjectId(notitypeId),
          deleted_at: null,
        },
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: "$order_id",
          // notifications: {
          //   $push: {
          //     _id: "$_id",
          //     infor: "$infor",
          //     receiver_id: "$receiver_id",
          //     sender_id: "$sender_id",
          //     notitype_id: "$notitype_id",
          //     createdAt: "$createdAt",
          //     updatedAt: "$updatedAt",
          //   },
          // },
          notiOrder: {
            $push: "$$ROOT"
          }
        },
      },
      // {
      //   $sort: { "_id": -1 } // Sắp xếp nhóm theo order_id (nếu cần)
      // }
    ]);

    if (groupNotis && groupNotis.length > 0) {
      return {
        EM: "Lấy danh sách thông báo cập nhật đơn hàng thành công",
        EC: 0,
        DT: groupNotis,
      };
    } else {
      return {
        EM: "Không có thông báo cập nhật đơn hàng",
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

const getTwoNotiUpdateOrderLastest = async (receiverId, notitypeId) => {
  try {
    const groupNotis = await Noti.aggregate([
      {
        $match: {
          receiver_id: new mongoose.Types.ObjectId(receiverId),
          notitype_id: new mongoose.Types.ObjectId(notitypeId),
          deleted_at: null,
        },
      },
      {
        $sort: { createdAt: -1 } // Sắp xếp theo thời gian tạo giảm dần (mới nhất trước)
      },
      {
        $group: {
          _id: "$order_id",
          notiOrder: {
            $push: "$$ROOT"
          }
        },
      },
      {
        $limit: 2 // Lấy tối đa 2 nhóm thông báo
      }
    ]);

    if (groupNotis && groupNotis.length > 0) {
      return {
        EM: "Lấy danh sách thông báo cập nhật đơn hàng thành công",
        EC: 0,
        DT: groupNotis,
      };
    } else {
      return {
        EM: "Không có thông báo cập nhật đơn hàng",
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

const createNotiByAdmin = async (data) => {
  // image, name, description, receiver_id, sender_id, notitype_id
  try {
    const notiByAdmin = await Noti.create({
      image: data.image,
      name: data.name,
      description: data.description,
      receiver_id: data.receiver_id,
      sender_id: data.sender_id,
      notitype_id: data.notitype_id,
    });
    if (notiByAdmin) {
      const res = await fetch(`http://localhost:3001/api/user/getDetailUser/${data.receiver_id}`);
      const json = await res.json();
      const user = json?.DT;
      if(!user){
        return {
          EM: 'Không tìm thấy thông tin người dùng',
          EC: -1,
          DT: [],
        };
      }
      // Gửi push notification nếu có fcmToken
      if (user.fcm_token) {
        const message = {
          token: user.fcm_token,
          notification: {
            title: data.name || "Thông báo mới",
            body: data.description || "",
          },
          data: {
            // orderId: data.orderId || "",
            receiverId: data.receiver_id || "",
          },
        };

        try {
          await admin.messaging().send(message);
          console.log("Push notification create by admin sent successfully.");
        } catch (fcmError) {
          console.error("Error sending FCM notification:", fcmError);
        }
      }

      return {
        EM: "Admin tạo thông báo thành công",
        EC: 0,
        DT: notiByAdmin,
      };
    } else {
      return {
        EM: "Admin tạo thông báo thất bại",
        EC: 0,
        DT: notiByAdmin,
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

const updateNotiByAdmin = async (notiId, data) => {
  try {
    console.log("notiId", notiId, data);
    const updatedNoti = await Noti.findByIdAndUpdate(
      {_id: notiId},
      {
        name: data.name,
        image: data.image,
        description: data.description,
      },
      { new: true }
    );

    if (updatedNoti) {
      const res = await fetch(`http://localhost:3001/api/user/getDetailUser/${data.receiver_id}`);
      const json = await res.json();
      const user = json?.DT;
      if(!user){
        return {
          EM: 'Không tìm thấy thông tin người dùng',
          EC: -1,
          DT: [],
        };
      }
      // Gửi push notification nếu có fcmToken
      if (user.fcm_token) {
        const message = {
          token: user.fcm_token,
          notification: {
            title: data.name || "Thông báo mới",
            body: data.description || "",
            image: data.image || "",
          },
          data: {
            receiverId: data.receiver_id || "",
          },
        };

        try {
          await admin.messaging().send(message);
          console.log("Push notification (updated by admin) sent successfully.");
        } catch (fcmError) {
          console.error("Error sending FCM notification:", fcmError);
        }
      }

      return {
        EM: "Admin cập nhật thông báo thành công",
        EC: 0,
        DT: updatedNoti,
      };
    } else {
      return {
        EM: "Không tìm thấy thông báo để cập nhật",
        EC: 1,
        DT: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      EM: "Đã xảy ra lỗi trong quá trình cập nhật",
      EC: -2,
      DT: null,
    };
  }
};

// const deleteNoti = async (id) => {
//   try {
//     const updatedNoti = await Noti.findByIdAndUpdate(
//       id,
//       { deleted_at: new Date() },
//       { new: true }
//     );

//     if (updatedNoti) {
//       return {
//         EM: "Đánh dấu thông báo là đã xóa thành công",
//         EC: 0,
//         DT: updatedNoti,
//       };
//     } else {
//       return {
//         EM: "Không tồn tại thông báo cần đánh dấu xóa",
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

const deleteNotiByAdmin = async (notiId) => {
  try {
    const noti = await Noti.deleteOne({ _id: notiId });

    if (noti.deletedCount > 0) {
      return {
        EM: "Xóa thông báo thành công",
        EC: 0,
        DT: noti,
      };
    } else {
      return {
        EM: "Không tìm thấy thông báo để xóa",
        EC: 1,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Có lỗi xảy ra trong quá trình xóa thông báo",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = {
  getAllNotiByReceiveId,
  getAllNotiByNotiType,
  createNotiOrder,
  updateStatusNoti,
  getDetailsNoti,
  createNotiVoucher,
  getAllNotiByAdminAndNotiType,
  getAllNotiBySenderIdAndNotiType,
  getNotiUpdateOrder,
  getTwoNotiUpdateOrderLastest,
  startUserVoucherJob,
  stopUserVoucherJob,
  createNotiByAdmin,
  updateNotiByAdmin,
  // deleteNoti,
  deleteNotiByAdmin,
};
