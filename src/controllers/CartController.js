// src/controllers/CartController.js
const CartService = require('../services/CartService');

const createCart = async (req, res) => {
  try {
    const cart = await CartService.createCart(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = await CartService.getCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await CartService.getCartById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await CartService.updateCart(req.params.id, req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await CartService.deleteCart(req.params.id);
    res.status(200).json({ message: "Cart deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, product_id, quantity, variant_id } = req.body;

    if (!userId || !product_id || !quantity ||!variant_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await CartService.addToCart(userId, {
      product_id,
      quantity,
      variant_id
    });
    
    return res.status(200).json({ status: 'OK', data: result });
  } catch (error) {
    return res.status(500).json({ status: 'ERR', message: error.message });
  }
};


const getCartItemsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await CartService.getCartItemsByUser(userId);
    return res.status(200).json({ status: 'OK', data: items });
  } catch (error) {
    return res.status(500).json({ status: 'ERR', message: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const updated = await CartService.updateCartItemQuantity(itemId, quantity);
    res.json({ status: 'OK', data: updated });
  } catch (err) {
    res.status(500).json({ status: 'ERR', message: err.message });
  }
};

const deleteMultipleCartItems = async (req, res) => {
  try {
    const { itemIds } = req.body;

    const result = await CartService.deleteMultipleCartItems(itemIds);

    return res.status(200).json({
      status: 'OK',
      message: 'Xoá thành công các cart items.',
      data: result,
    });
  } catch (error) {
    console.error('❌ Lỗi xoá cart items:', error);
    return res.status(500).json({ status: 'ERR', message: error.message });
  }
};


module.exports = {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
  addToCart,
  getCartItemsByUser,
  updateQuantity,
  deleteMultipleCartItems
};
