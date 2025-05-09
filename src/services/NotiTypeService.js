const NotiType = require("../models/NotiTypeModel");
const Noti = require("../models/NotiModel");
const mongoose = require('mongoose');

const getAllNotiType = async () => {
  try {
    let notiTypes = await NotiType.find({ deleted_at: null });
    if (notiTypes) {
      return {
        EM: "Lấy danh sách loại thông báo thành công",
        EC: 0,
        DT: notiTypes,
      };
    } else {
      return {
        EM: "Danh sách loại thông báo trống",
        EC: 0,
        DT: notiTypes,
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

const getQuantityNoti = async (receiverId, notitypeId = null) => {
  try {
    // Tạo điều kiện lọc cho Noti
    const notiMatchStage = {
      receiver_id: new mongoose.Types.ObjectId(receiverId),
    };

    if (notitypeId) {
      notiMatchStage.notitype_id = new mongoose.Types.ObjectId(notitypeId);
    }

    const result = await Noti.aggregate([
      { $match: notiMatchStage },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: 1 },
        },
      },
    ]);

    const total = result[0]?.totalQuantity || 0;

    return {
      EM: "Lấy tổng số lượng thông báo thành công",
      EC: 0,
      DT: total,
    };
  } catch (e) {
    console.error("Service Error:", e);
    return {
      EM: "Đã xảy ra lỗi trong quá trình xử lý",
      EC: -2,
      DT: 0,
    };
  }
};

const createNotiType = async (data) => {
    try {
        await NotiType.create({
          image: data.image,
          name: data.name,
          description: data.description,
          status: data.status,
        })
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
    if(notiType){
      return {
        EM: "Lấy thông tin loại thông báo thành công",
        EC: 0,
        DT: notiType,
      };
    }else {
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
}

module.exports = {
  getAllNotiType,
  createNotiType,
  updateNotiType,
  deleteNotiType,
  getDetailsNotiType,
  getQuantityNoti
};
