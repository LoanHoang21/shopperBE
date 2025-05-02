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

module.exports = {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
};
