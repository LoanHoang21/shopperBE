const Shipment = require('../models/ShipmentModel');

const createShipment = async (data) => {
  const created = await Shipment.create(data);
  return created;
};

module.exports = { createShipment };
