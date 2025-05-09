const PaymentMethod = require('../models/PaymentMethod');

const PaymentMethodService = {
  create: async (data) => {
    const newMethod = new PaymentMethod(data);
    return await newMethod.save();
  },

  getAll: async () => {
    return await PaymentMethod.find();
  },

  getPaymentMethodById: async (id) => {
    return await PaymentMethod.findById(id);
  },
};

module.exports = PaymentMethodService;
