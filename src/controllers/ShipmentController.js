const ShipmentService = require("../services/ShipmentService");

const createShipment = async (req, res) => {
  try {
    const { price, shipper_name, shipper_phone, status } = req.body;

    // Kiểm tra thiếu trường
    if (!price || !shipper_name || !shipper_phone) {
      return res.status(400).json({ status: 'ERR', message: 'Missing required fields' });
    }

    const shipment = await ShipmentService.createShipment({
      price,
      shipper_name,
      shipper_phone,
      status
    });

    return res.status(201).json({ status: 'OK', message: 'Shipment created', data: shipment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'ERR', message: 'Internal server error' });
  }
};

module.exports = { createShipment };
