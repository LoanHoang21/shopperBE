// src/services/CartService.js
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const mongoose = require('mongoose');


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

const isSameAttribution = (a, b) => {
  if (a.length !== b.length) return false;
  return a.every(attrA =>
    b.some(attrB => attrA.category === attrB.category && attrA.value === attrB.value)
  );
};

const addToCart = async (userId, { product_id, quantity, attributions = [], variant_id }) => {
  let cart = await Cart.findOne({ customer_id: userId });
  if (!cart) {
    cart = await Cart.create({ customer_id: userId });
  }
  console.log('📦 Cart tìm thấy:', cart?._id);

  const existingItems = await CartItem.find({
    cartId: cart._id,
    product_id,
    deleted_at: null
  });

  console.log('📄 Các item đang có trong giỏ:', existingItems);

  const existingItem = existingItems.find(item =>
    isSameAttribution(item.attributions || [], attributions)
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.updated_at = new Date();
    await existingItem.save();
    console.log('✅ Trùng option -> cập nhật');
    return { status: 'OK', message: 'Updated cart item', data: existingItem };
  }

  console.log('🆕 Không trùng -> tạo mới',{
    product_id,
    quantity,
    attributions,
    cartId: cart._id,
    isSelected: false,
    created_at: new Date(),
    updated_at: new Date()
  });

  const newItem = await CartItem.create({
    product_id: new mongoose.Types.ObjectId(product_id),
    quantity,
    variant_id: new mongoose.Types.ObjectId(variant_id),
    attributions,
    cartId: new mongoose.Types.ObjectId(cart._id),
    isSelected: false,
    created_at: new Date(),
    updated_at: new Date()
  });

  return { status: 'OK', message: 'Added to cart', data: newItem };
};

const getCartItemsByUser = async (userId) => {
  const cart = await Cart.findOne({ customer_id: userId });
  if (!cart) return [];

  const items = await CartItem.find({ cartId: cart._id, deleted_at: null })
    .populate({
      path: 'product_id',
      populate: {
        path: 'category_id',
        populate: {
          path: 'shop_id'
        }
      }
    })
    .populate('variant_id')
    .lean();

  return items;
};

const updateCartItemQuantity = async (itemId, quantity) => {
  return await CartItem.findByIdAndUpdate(
    itemId,
    { quantity, updated_at: new Date() },
    { new: true }
  );
};

const deleteMultipleCartItems = async (itemIds) => {
  if (!Array.isArray(itemIds) || itemIds.length === 0) {
    throw new Error('Danh sách itemIds không hợp lệ.');
  }

  const result = await CartItem.deleteMany({ _id: { $in: itemIds } });
  return result;
};


module.exports = {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
  addToCart,
  getCartItemsByUser, 
  updateCartItemQuantity,
  deleteMultipleCartItems,
};
