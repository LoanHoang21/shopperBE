const CartItem = require('../models/CartItem');
const Product = require('../models/ProductModel');  
const Category = require('../models/Category'); 
const Shop = require('../models/Shop');  
const ProductAttribution = require('../models/ProductAttribution'); // Import thêm
const CategoryAttribution = require('../models/CategoryAttribution'); 
const Attribution = require('../models/Attribution'); 

const createCartItem = async (data) => {
  const item = new CartItem(data);
  return await item.save();
};


const getAllCartItems = async () => {
  const cartItems = await CartItem.find({ deleted_at: null })
    .populate({
      path: 'product_id',
      populate: {
        path: 'category_id',
        populate: {
          path: 'shop_id',
        },
      },
    });

  const result = [];

  for (const item of cartItems) {
    const productId = item.product_id._id;

    // 1. Lấy các ProductAttribution
    const productAttributions = await ProductAttribution.find({ product_id: productId });

    const attributes = [];

    for (const pa of productAttributions) {
      // 2. Lấy tên của CategoryAttribution
      const categoryAttr = await CategoryAttribution.findById(pa.category_attribution_id);

      // 3. Lấy các thuộc tính (Attribution)
      const attributions = await Attribution.find({ category_attribution_id: pa.category_attribution_id });

      attributes.push({
        category_attribution_id: pa.category_attribution_id,
        category_attribution_name: categoryAttr ? categoryAttr.name : '',   // 🧠 Lấy thêm tên
        attributions: attributions.map(attr => ({
          _id: attr._id,
          name: attr.name,
        })),
      });
    }

    result.push({
      ...item.toObject(),
      product_attributes: attributes,
    });
  }

  return result;
};

  

const getCartItemById = async (id) => {
  return await CartItem.findOne({ id, deleted_at: null });
};

const updateCartItem = async (id, updates) => {
    updates.updated_at = new Date();
    return await CartItem.findOneAndUpdate(
      { id, deleted_at: null },  // Thêm điều kiện chưa bị xoá
      updates,
      { new: true }
    );
  };
  
  const deleteCartItem = async (id) => {
    return await CartItem.findOneAndUpdate(
      { id, deleted_at: null },  // Thêm điều kiện chưa bị xoá
      { deleted_at: new Date() },
      { new: true }
    );
  };
  

module.exports = {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
};
