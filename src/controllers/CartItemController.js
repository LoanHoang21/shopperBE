const CartItemService = require('../services/CartItemService');

const create = async (req, res) => {
  try {
    const data = await CartItemService.createCartItem(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await CartItemService.getAllCartItems();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const data = await CartItemService.getCartItemById(req.params.id);
    if (!data) return res.status(404).json({ message: "CartItem not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await CartItemService.updateCartItem(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await CartItemService.deleteCartItem(req.params.id);
    res.status(200).json({ message: 'Deleted successfully', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
