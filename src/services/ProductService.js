const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");
const JwtService = require("./JwtService");
const ProductVariant = require('../models/ProductVariantModel');
const createProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newProduct = await Product.create(data);
      resolve(newProduct);
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      return resolve({
        status: "OK",
        message: "All Product",
        data: checkProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();

      // Truy vấn sản phẩm chính
      let allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit)
        .populate({
          path: 'category_id',
          populate: {
            path: 'shop_id',
            model: 'Shop',
            select: 'name',
          },
        })
        .lean();

      // Lấy tất cả variant theo product_id
      const productIds = allProduct.map(p => p._id);
      const variants = await ProductVariant.find({ product_id: { $in: productIds } }).lean();

      // Map ảnh từ variant vào product
      const imageMap = {};
      variants.forEach(v => {
        const id = String(v.product_id);
        if (!imageMap[id]) imageMap[id] = [];
        if (v.image) imageMap[id].push(v.image);
      });

      const finalProduct = allProduct.map(p => ({
        ...p,
        images: imageMap[String(p._id)] || [],
        shop_name: p.category_id?.shop_id?.name || 'Không rõ',
      }));

      return resolve({
        status: "OK",
        message: "All Product",
        data: finalProduct,
        total: totalProduct,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getRecommendedProductByOrders = async (userId) => {
  try {
    const res = await fetch(`http://localhost:3001/api/orderAdmin/getAll/${userId}`);
    const json = await res.json();
    const orderByUser = json?.DT;
    // const orderByUser = await Order.find({ customer_id: userId });
    // console.log("orderByUser", orderByUser);
    // orderByUser.forEach((order, index) => {
    //   console.log(`Order ${index + 1}:`, JSON.stringify(order.products, null, 2));
    // });
    if(!orderByUser || orderByUser.length === 0){
      const res1 = await fetch(`http://localhost:3001/api/product/getAll`);
      const json1 = await res1.json();
      const products = json1?.data;
      return {
        EM: 'Trả về tất cả sản phẩm',
        EC: 0,
        DT: products,
      };
    }else{
      const allProductIds = orderByUser.flatMap(order =>
        order.products.map(p => p.product_id)
      );
      // console.log("allProductIds", allProductIds);
      // 3. Truy vấn Product theo các productId này
      const products = await Product.find({ _id: { $in: allProductIds } }).lean();
        // .select('_id price discount category_id name images')
        // .lean();
      // console.log("products",products);
      const categoryCount = {};
      products.forEach(product => {
        const cateId = product.category_id?.toString();
        if (cateId) {
          categoryCount[cateId] = (categoryCount[cateId] || 0) + 1;
        }
      });
      // console.log("categoryCount", categoryCount);
      // 5. Lấy 2 categoryId phổ biến nhất
      const topCategoryIds = Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1]) // sắp xếp theo số lượng giảm dần
        .slice(0, 2)
        .map(([categoryId]) => categoryId);
      // console.log("topCategoryIds", topCategoryIds);
      // 6. Lấy tất cả sản phẩm thuộc 2 category phổ biến nhất
      const categoryProducts = await Product.find({
        category_id: { $in: topCategoryIds },
        deleted_at: null
      });
        // .select('_id name price discount category_id images')
        // .lean();
      // console.log("categoryProducts",categoryProducts);

      // 7. Tính giá sau giảm cho từng sản phẩm
      for (const p of categoryProducts) {
        const discountRate = (p.discount || 0) / 100;
        p.discountedPrice = p.price * (1 - discountRate);
      }
      // 8. Lấy 10 sản phẩm có giá sau giảm rẻ nhất
      const bestDeals = categoryProducts
      .sort((a, b) => a.discountedPrice - b.discountedPrice)
      .slice(0, 10);

      return {
        EM: 'Gợi ý sản phẩm từ đơn hàng gần đây',
        EC: 0,
        DT: bestDeals
      };
      }
  } catch (error) {
    return {
      EM: "Đã xảy ra lỗi khi lấy chi tiết người dùng",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = {
  getDetailProduct,
  getAllProduct,
  createProduct,
  getRecommendedProductByOrders,
};
