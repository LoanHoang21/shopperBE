const Shop = require('../models/ShopModel');
const ShopService = require('../services/ShopService');

const createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json({ status: "OK", message: "Shop created", data: shop });
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};

const getAllShops = async (req, res) => {
  const shops = await Shop.find();
  res.status(200).json({ status: "OK", data: shops });
};
const updateShop = async (req, res) => {
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
const deleteShop = async (req, res) => {
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

const getShopByUserId = async (req, res) => {
  const userId = req.query.user_id;
    try{
        let data = await ShopService.getShopByUserId(userId);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({ 
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

module.exports = {
    createShop,
    getAllShops, 
    updateShop,
    deleteShop,
    getShopByUserId,
};