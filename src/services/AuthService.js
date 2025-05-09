const User = require("../models/UserModel");
const SettingNoti = require("../models/SettingNotiModel");
const JwtService = require("./JwtService");
const bcrypt = require("bcryptjs");
const { startUserVoucherJob , stopUserVoucherJob } = require("./NotiService");

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const checkFieldExist = async (field, value) => {
  if (value=='') return false;
  let user = await User.findOne({
    [field]: value
  });
  if (user) {
    return true;
  }
  return false;
};

const register = async (body) => {
  try {
    // check user, email, phone are exist
    let isUsernameExist = await checkFieldExist("username", body.username);
    if (isUsernameExist === true) {
      return {
        EM: "Tên đăng nhập đã tồn tại",
        EC: 1,
      };
    }
    let isEmailExist = await checkFieldExist("email", body.email);
    if (isEmailExist === true ) {
      return {
        EM: "Email đã đăng kí",
        EC: 1,
      };
    }
    let isPhoneExist = await checkFieldExist("phone", body.phone);
    if (isPhoneExist === true) {
      return {
        EM: "Số điện thoại đã đăng kí",
        EC: 1,
      };
    }

    // hash user password
    let hashPassword = hashUserPassword(body.password);

    // Lấy bản ghi SettingNoti có status: "Bật"
    const defaultSettingNoti = await SettingNoti.findOne({ status: "Bật" });

    // create new user
    await User.create({
      username: body.username,
      email: body.email,
      phone: body.phone,
      password: hashPassword,
      setting_noti_id: defaultSettingNoti._id,
    });
    console.log('Tạo tài khoản thành công', body);
    return {
      EM: 'Tạo tài khoản thành công',
      EC: 0,
    }
  } catch (e) {
    console.log(e);
    return {
      EM: 'Something wrongs in service...',
      EC: -2,
    }
  }
};

// const getAllProduct = (limit, page, sort, filter) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const totalProduct = await Product.countDocuments();

//       if (filter) {
//         const allProductFilter = await Product.find({
//           [filter[0]]: { $regex: filter[1], $options: "i" },
//         });
//         return resolve({
//           status: "OK",
//           message: "All Product",
//           data: allProductFilter,
//           total: totalProduct,
//           pageCurrent: page + 1,
//           totalPage: Math.ceil(totalProduct / limit),
//         });
//       }

//       if (sort) {
//         const objectSort = {};
//         objectSort[sort[1]] = sort[0];
//         const allProductSort = await Product.find()
//           .limit(limit)
//           .skip(page * limit)
//           .sort(objectSort);
//         return resolve({
//           status: "OK",
//           message: "Success",
//           data: allProductSort,
//           total: totalProduct,
//           pageCurrent: page + 1,
//           totalPage: Math.ceil(totalProduct / limit),
//         });
//       }

//       const allProduct = await Product.find()
//         .limit(limit)
//         .skip(page * limit);
//       return resolve({
//         status: "OK",
//         message: "All Product",
//         data: allProduct,
//         total: totalProduct,
//         pageCurrent: page + 1,
//         totalPage: Math.ceil(totalProduct / limit),
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
}

const login = async (rawData) => {
  try {
    let user = await User.findOne({
      $or: [
        { username: rawData.valueLogin },
        { email: rawData.valueLogin },
        { phone: rawData.valueLogin }
      ]
    });

    // console.log(">>>>>>>check user", user);

    if(user){
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if(isCorrectPassword === true){
        if(user.role !== 1){
          startUserVoucherJob(user._id);
        }
        return {
          EM: "Đăng nhập thành công",
          EC: 0,
          DT: user,
        };
      }
    }
    // console.log("Tên đăng nhập/Email/SĐT hoặc mật khẩu không đúng", rawData.valueLogin,"password: ", rawData.password);
    return {
      EM: "Tên đăng nhập/Email/SĐT hoặc mật khẩu không đúng",
      EC: 1,
      DT: '',
    };
    // console.log(rawData);
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrongs in service...',
      EC: -2,
    }
  }
};

const logout = async (userId) => {
  try {
    // Dừng job kiểm tra voucher
    stopUserVoucherJob(userId);

    // Optional: Xóa fcm_token nếu cần
    await User.findByIdAndUpdate(userId, { fcm_token: null });

    return {
      EM: "Đăng xuất thành công",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi khi đăng xuất",
      EC: -2,
    };
  }
};

module.exports = {
  register,
  login,
  logout,
};