const SettingNoti = require("../models/SettingNotiModel");
const User = require("../models/UserModel");
const cron = require('cron');

const getAllUser = async () => {
  try {
    let users = await User.find({deletedAt: null});
    // let users = await User.find({})
    //   .select("id username email phone profileId")
    //   .populate({
    //     path: "profileId", // tham chiếu id đến bảng khác để lấy trường
    //     select: "nameProfile age address", // lấy nhiều trường
    //   });
    if (users) {
      return {
        EM: "Lấy danh sách user thành công",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
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

// const updateUser = async(data) => {
//   try {
//       let user = await User.findOne({
//           id: data.id
//       });
//       if(user){
//         user.save()
//       }else{

//       }
//   } catch (error) {
//       console.log(error);
//       return {
//           EM: "Something wrongs in service...",
//           EC: -2,
//           DT: [],
//         };
//   }
// };


// const deleteUser = async (id) => {
//   try{
//     const deletedUser = await User.findByIdAndDelete(id);
//     if(deletedUser){
//       return {
//         EM: "Xóa user thành công",
//         EC: 0,
//         DT: deletedUser,
//       };
//     }else{
//       return {
//         EM: "Không tồn tại user cần xóa",
//         EC: 0,
//         DT: [],
//       };
//     }
//   } catch (e) {
//     console.log(error);
//     return {
//         EM: "Something wrongs in service...",
//         EC: -2,
//         DT: [],
//       };
//   }
// };

const updateFcmToken = async (userId, data) => {
  try {
    const updateFcm= await User.findOneAndUpdate(
      { _id: userId, deletedAt: null },
      {
        fcm_token: data.fcm_token,
        backup_fcm_token: data.fcm_token,
      },
      { new: true } // trả về document mới sau khi cập nhật
    );

    if (updateFcm) {
      return {
        EM: "Cập nhật Fcm Token thành công",
        EC: 0,
        DT: updateFcm,
      };
    } else {
      return {
        EM: "Không tìm thấy user cần cập nhật",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("Error in updateFcmToken:", error);
    return {
      EM: "Đã xảy ra lỗi khi cập nhật Fcm Token",
      EC: -2,
      DT: [],
    };
  }
};

const getDetailUser = async (userId) => {
    try {
      const user = await User.findOne({ _id: userId, deletedAt: null }).populate("setting_noti_id");
      if (user) {
        return {
          EM: "Lấy thông tin chi tiết người dùng thành công",
          EC: 0,
          DT: user,
        };
      } else {
        return {
          EM: "Người dùng không tồn tại",
          EC: 0,
          DT: [],
        };
      }
    } catch (error) {
      return {
        EM: "Đã xảy ra lỗi khi lấy chi tiết người dùng",
        EC: -2,
        DT: [],
      };
    }
};

const userSettingNoti = {}; // Lưu job theo userId

// Khởi động cron job riêng cho user
const startUserSettingNotiJob = (userId) => {
  if (userSettingNoti[userId]) {
    console.log(`Job setting noti vẫn đang chạy cho user ${userId}`);
    return;
  }

  const job = new cron.CronJob('*/30 * * * * *', async () => {
    const user = await User.findById(userId);
    if (user && user.end_time && user.backup_fcm_token) {
      const now = new Date();
      if (now >= user.end_time) {
        const statusOn = await SettingNoti.findOne({
          status: "Bật",
        });
        console.log("statusOn", statusOn);
        const updateNew = await User.findByIdAndUpdate(userId, {
          setting_noti_id: statusOn._id,
          fcm_token: user.backup_fcm_token,
          // backup_fcm_token: null,
          end_time: null,
        }).populate('setting_noti_id').exec();

        // Dừng job sau khi khôi phục
        stopUserSettingNotiJob(userId);
      }
    }
  });

  job.start();
  userSettingNoti[userId] = job;
  console.log(`Bắt đầu cron job setting noti cho user ${userId}`);
};

// Dừng cron job
const stopUserSettingNotiJob = (userId) => {
  const job = userSettingNoti[userId];
  if (job) {
    job.stop();
    delete userSettingNoti[userId];
    console.log(`Dừng cron job cho user ${userId}`);
  }
};

const updateSettingNoti = async (userId, data) => {
  try {
    const res = await fetch(`http://localhost:3001/api/user/getDetailUser/${userId}`);
    const json = await res.json();
    const user = json?.DT;
    if(!user){
      return {
        EM: 'Không tìm thấy thông tin người dùng',
        EC: -1,
        DT: [],
      };
    }

    const res1 = await fetch(`http://localhost:3001/api/settingNoti/getSettingNotiById/${data.setting_noti_id}`);
    const json1 = await res1.json();
    const settingnoti = json1.DT;
    if(!settingnoti){
      return {
        EM: 'Không tìm thấy thông tin cài đặt thông báo',
        EC: -1,
        DT: [],
      };
    }

    // Logic xử lý FCM và thời gian
    let endTime = null;
    let fcmToken = user.fcm_token;
    let backupFcmToken = user.backup_fcm_token;
    let statusSetting = settingnoti.status;
    let statusName = settingnoti.name;
    
    if(user.setting_noti_id!==data.setting_noti_id){
      if(statusSetting === "Bật"){
        fcmToken = backupFcmToken;
        stopUserSettingNotiJob(userId);
      }else{
        // Tắt thông báo Trong 30 phút, Trong 1 giờ, Trong 12 giờ, Trong 24 giờ, Cho đến khi tôi bật lại
        // if (statusName === "Trong 30 phút"){
        //   endTime = new Date(Date.now() + 30 * 60 * 1000);
        //   fcmToken = null;
        //   startUserSettingNotiJob(userId);
        // }
        if (statusName === "Trong 30 phút"){
          endTime = new Date(Date.now() + 2 * 60 * 1000);
          fcmToken = null;
          startUserSettingNotiJob(userId);
        }
        else if (statusName === "Trong 1 giờ"){
          endTime = new Date(Date.now() + 1 * 60 * 60 * 1000);
          fcmToken = null;
          startUserSettingNotiJob(userId);
        }else if (statusName === "Trong 12 giờ"){
          endTime = new Date(Date.now() + 12 * 60 * 60 * 1000);
          fcmToken = null;
          startUserSettingNotiJob(userId);
        }else if (statusName === "Trong 24 giờ"){
          endTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
          fcmToken = null;
          startUserSettingNotiJob(userId);
        }else if (statusName === "Cho đến khi tôi bật lại"){
          endTime = null;
          fcmToken = null;
          startUserSettingNotiJob(userId);
        }
      }
    }

    const updateNew = await User.findOneAndUpdate(
      { _id: userId, deletedAt: null },
      {
        setting_noti_id: data.setting_noti_id,
        fcm_token: fcmToken,
        backup_fcm_token: backupFcmToken,
        end_time: endTime,
      },
      { new: true } // trả về document mới sau khi cập nhật
    ).populate('setting_noti_id').exec();
    console.log(">>>>>>tesst", updateNew);

    if (updateNew) {
      return {
        EM: "Cập nhật cài đặt thông báo thành công",
        EC: 0,
        DT: updateNew,
      };
    } else {
      return {
        EM: "Không tìm thấy user cần cập nhật",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("Error in updateSettingNoti:", error);
    return {
      EM: "Đã xảy ra lỗi khi cập nhật cài đặt thông báo",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  updateFcmToken,
  getDetailUser,
  updateSettingNoti,
};