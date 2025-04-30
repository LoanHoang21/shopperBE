const User = require("../models/UserModel");

const getAllList = async () => {
  try {
    let users = await User.find({}).select("id username email phone");
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

const createUser = async (data) => {
    try {
        await User.create({

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

const updateUser = async(data) => {
    try {
        let user = await User.findOne({
            id: data.id
        });
        if(user){
          user.save()
        }else{

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

const deleteUser = async (id) => {
  try{
    const deletedUser = await User.findByIdAndDelete(id);
    if(deletedUser){
      return {
        EM: "Xóa user thành công",
        EC: 0,
        DT: deletedUser,
      };
    }else{
      return {
        EM: "Không tồn tại user cần xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(error);
    return {
        EM: "Something wrongs in service...",
        EC: -2,
        DT: [],
      };
  }
};

module.exports = {
  getAllList,
  createUser,
  updateUser,
  deleteUser,
};
