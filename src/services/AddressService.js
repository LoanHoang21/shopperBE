const Address = require("../models/AddressModel");

const createOrUpdateAddress = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updated = await Address.findOneAndUpdate(
        { customer_id: data.customer_id },
        { $set: data },
        { upsert: true, new: true }
      );
      resolve(updated);
    } catch (e) {
      reject(e);
    }
  });
};

const getAddressByCustomerId = (customer_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const found = await Address.findOne({ customer_id });
      if (!found) return resolve({ status: "ERR", message: "Không tìm thấy địa chỉ" });
      resolve({ status: "OK", message: "Success", data: found });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrUpdateAddress,
  getAddressByCustomerId,
};