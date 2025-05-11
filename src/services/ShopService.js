const Shop = require("../models/ShopModel");
const Category = require("../models/Category");

const getShopByUserId = async (userId) => {
  try {
    let shop = await Shop.findOne({ user_id: userId , deleted_at: null});
    if (shop) {
      return {
        EM: "Lấy shop theo id người dùng thành công",
        EC: 0,
        DT: shop,
      };
    } else {
      return {
        EM: "Lấy shop theo id khách hàng trống",
        EC: 0,
        DT: shop,
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
  getShopByUserId,
};
