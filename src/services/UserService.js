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
  } catch (error) {
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

const updateUser = async (data) => {
  try {
    let user = await User.findOne({ id: data.id });

    if (!user) {
      return {
        EM: "User not found",
        EC: 1,
        DT: null,
      };
    }

    // Cập nhật các trường tại đây (ví dụ)
    user.name = data.name || user.name;
    user.email = data.email || user.email;

    await user.save();

    return {
      EM: "Update successful",
      EC: 0,
      DT: user,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
      DT: [],
    };
  }
};

const deleteUser = (id) => {};

module.exports = {
  getAllList,
  createUser,
  updateUser,
  deleteUser,
};
