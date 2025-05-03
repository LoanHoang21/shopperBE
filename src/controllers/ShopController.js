const Shop = require('../models/ShopModel');

exports.createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json({ status: "OK", message: "Shop created", data: shop });
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};

exports.getAllShops = async (req, res) => {
  const shops = await Shop.find();
  res.status(200).json({ status: "OK", data: shops });
};
exports.updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updated_at: Date.now()
      },
      { new: true }
    );
    res.status(200).json({ status: "OK", data: shop });
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { deleted_at: Date.now() },
      { new: true }
    );
    res.status(200).json({ status: "OK", message: "Shop deleted", data: shop });
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
