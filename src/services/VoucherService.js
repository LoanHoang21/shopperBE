const Voucher = require("../models/VoucherModel");

const getAllVoucher = async () => {
  try {
    let vouchers = await Voucher.find({ deleted_at: null }).sort({ end_date: -1 });
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

const getDetailVoucher = async (id) => {
  try {
    const voucher = await Voucher.findById(id);

    if (!voucher) {
      return {
        EM: "Không tìm thấy voucher",
        EC: 1,
        DT: null,
      };
    }

    return {
      EM: "Lấy chi tiết voucher thành công",
      EC: 0,
      DT: voucher,
    };
  } catch (error) {
    console.error(error);
    return {
      EM: "Có lỗi xảy ra trong service",
      EC: -1,
      DT: null,
    };
  }
};

module.exports = {
  getAllVoucher,
  getDetailVoucher,
};
