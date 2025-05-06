const AddressService = require("../services/AddressService");

const createOrUpdateAddress = async (req, res) => {
  try {
    const response = await AddressService.createOrUpdateAddress(req.body);
    return res.status(200).json({ status: "OK", message: "Success", data: response });
  } catch (e) {
    return res.status(500).json({ status: "ERR", message: e.message });
  }
};

const getAddressByCustomerId = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const response = await AddressService.getAddressByCustomerId(customer_id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ status: "ERR", message: e.message });
  }
};

module.exports = {
  createOrUpdateAddress,
  getAddressByCustomerId,
};