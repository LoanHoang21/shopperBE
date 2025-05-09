const PaymentMethodService = require('../services/PaymentMethodService');

const createPaymentMethod = async (req, res) => {
  try {
    const method = await PaymentMethodService.create(req.body);
    res.status(201).json({ status: 'OK', message: 'Created', data: method });
  } catch (err) {
    res.status(500).json({ status: 'ERR', message: err.message });
  }
};

const getAllPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethodService.getAll();
    res.status(200).json({ status: 'OK', message: 'Fetched', data: methods });
  } catch (err) {
    res.status(500).json({ status: 'ERR', message: err.message });
  }
};

const getPaymentMethodById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await PaymentMethodService.getPaymentMethodById(id);

    if (!result) {
      return res.status(404).json({ status: 'ERR', message: 'Not found' });
    }

    return res.status(200).json({ status: 'OK', data: result });
  } catch (error) {
    return res.status(500).json({ status: 'ERR', message: 'Server error' });
  }
};

module.exports = {
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById
};
