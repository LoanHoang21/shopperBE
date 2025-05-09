const SettingNoti = require("../models/SettingNotiModel");

const getAllSettingNotiByStatus = async (value) => {
  try {
    let settingnotis = await SettingNoti.find({ status: { $ne: value } , deletedAt: null });
    if (settingnotis) {
      return {
        EM: "Lấy danh sách tất cả cài đặt thông báo theo trạng thái thành công",
        EC: 0,
        DT: settingnotis,
      };
    } else {
      return {
        EM: "Danh sách cài đặt thông báo theo trạng thái trống",
        EC: 0,
        DT: settingnotis,
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

const getAllSettingNoti = async () => {
  try {
    let settingnotis = await SettingNoti.find({ deletedAt: null }).sort({ _id: 1 });
    if (settingnotis) {
      return {
        EM: "Lấy danh sách tất cả cài đặt thông báo thành công",
        EC: 0,
        DT: settingnotis,
      };
    } else {
      return {
        EM: "Danh sách cài đặt thông báo trống",
        EC: 0,
        DT: settingnotis,
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

const getSettingNotiById = async (settingNotiId) => {
  try {
    let settingnoti = await SettingNoti.findById(settingNotiId);
    if (settingnoti) {
      return {
        EM: "Lấy cài đặt thông báo theo Id thành công",
        EC: 0,
        DT: settingnoti,
      };
    } else {
      return {
        EM: "Không tồn tại cài đặt thông báo",
        EC: 0,
        DT: settingnoti,
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

// // Hàm tắt thông báo tạm thời
// const disableNotiTemporarily = async (userId, setting_noti_id, minutes, backupFcmToken) => {
//   try {
//     // Tìm user trong database
//     let user = await User.find(userId);
//     if (!user) {
//       return {
//         EM: "Không tìm thấy người dùng.",
//         EC: 1,
//         DT: [],
//       };
//     }

//     // Lưu backup FCM token và set FCM token thành null
//     // user.backup_fcm_token = backupFcmToken;
//     user.fcm_token = null;
//     // user.fcm_expire_at = new Date(Date.now() + minutes * 60 * 1000); // Thời gian tắt thông báo
//     user.setting_noti_id = setting_noti_id; // Cập nhật id cài đặt thông báo

//     await user.save(); // Lưu lại thông tin user

//     // Lên lịch bật lại thông báo sau 'minutes' phút
//     setTimeout(async () => {
//       // Kiểm tra lại và khôi phục lại FCM token sau khi hết thời gian
//       const updatedUser = await User.find(userId);
//       if (updatedUser && !updatedUser.fcm_token && updatedUser.backup_fcm_token) {
//         updatedUser.fcm_token = updatedUser.backup_fcm_token; // Khôi phục FCM token
//         updatedUser.backup_fcm_token = null; // Xóa backup
//         updatedUser.fcm_expire_at = null; // Xóa thời gian tắt
//         await updatedUser.save(); // Lưu lại user

//         // Cập nhật cài đặt thông báo
//         const setting = await getAllSettingNotiByStatus(0); // Giả sử bạn có trạng thái là 0 là "Bật thông báo"
//         const settingNotiId = setting.DT[0]._id;
//         updatedUser.setting_noti_id = settingNotiId;
//         await updatedUser.save();
//       }
//     }, minutes * 60 * 1000);

//     return {
//       EM: "Đã tắt thông báo thành công.",
//       EC: 0,
//       DT: [],
//     };
//   } catch (error) {
//     console.error("Error in disableNotiTemporarily:", error);
//     return {
//       EM: "Lỗi xử lý tắt thông báo.",
//       EC: -2,
//       DT: [],
//     };
//   }
// };

module.exports = {
  getAllSettingNotiByStatus,
  getAllSettingNoti,
  getSettingNotiById,
  // disableNotiTemporarily,
};
