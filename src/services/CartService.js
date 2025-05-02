// src/services/CartService.js
const Cart = require('../models/Cart');

const createCart = async (cartData) => {
  const newCart = new Cart(cartData);
  return await newCart.save();
};

const getCarts = async () => {
  return await Cart.find({ deleted_at: null });
};

const getCartById = async (id) => {
  return await Cart.findOne({ id, deleted_at: null });
};

const updateCart = async (id, updateData) => {
  return await Cart.findOneAndUpdate({ id }, updateData, { new: true });
};

const deleteCart = async (id) => {
  return await Cart.findOneAndUpdate({ id }, { deleted_at: new Date() }, { new: true });
};

module.exports = {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
};
