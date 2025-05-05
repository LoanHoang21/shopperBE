const PaymentMethod = require('../models/PaymentMethod');

const createPaymentMethod = async (data) => {
  const created = await PaymentMethod.create(data);
  return created;
};

module.exports = {
  createPaymentMethod,
};
