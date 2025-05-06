const PaymentMethodService = require("../services/PaymentMethodService");

const createPaymentMethod = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ status: 'ERR', message: 'Name is required' });
    }

    const result = await PaymentMethodService.createPaymentMethod({ name, description });

    return res.status(201).json({
      status: 'OK',
      message: 'Payment method created',
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'ERR', message: 'Internal server error' });
  }
};

module.exports = {
  createPaymentMethod,
};
