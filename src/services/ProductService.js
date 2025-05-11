const axios = require("axios");
const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");
const JwtService = require("./JwtService");
const ProductVariant = require("../models/ProductVariantModel");
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

      // Lấy danh sách sản phẩm và populate shop name
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

      const productIds = allProduct.map(p => p._id);

      // Lấy toàn bộ variants theo product_id
      const variants = await ProductVariant.find({
        product_id: { $in: productIds }
      }).lean();

      // Map ảnh và variants
      const imageMap = {};
      const variantMap = {};

      variants.forEach(v => {
        const id = String(v.product_id);
        if (!imageMap[id]) imageMap[id] = [];
        if (!variantMap[id]) variantMap[id] = [];

        if (v.image) imageMap[id].push(v.image);
        variantMap[id].push(v);
      });

      // Gộp vào sản phẩm
      const finalProduct = allProduct.map(p => ({
        ...p,
        images: imageMap[String(p._id)] || [],
        variants: variantMap[String(p._id)] || [],
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


const getRecommendedProductByOrders = async (customerId) => {
  try {
    const res = await axios.get("http://localhost:3001/api/orderAdmin/getAll", {
      params: {
        customer_id: customerId,
      },
    });
    const orderByUser = res.data.DT;

    if (!orderByUser || orderByUser.length === 0) {
      const res1 = await fetch(`http://localhost:3001/api/product/getAll`);
      const json1 = await res1.json();
      const products = json1?.data;
      return {
        EM: "Trả về tất cả sản phẩm",
        EC: 0,
        DT: products,
      };
    } else {
      const allProductIds = orderByUser.flatMap((order) =>
        order.products.map((p) => p.product_id)
      );

      const allIds = allProductIds.map((product) => product.product_id);

      // Truy vấn sản phẩm theo _id
      const products = await Product.find({ _id: { $in: allIds } }).lean();

      const categoryCount = {};
      products.forEach((product) => {
        const cateId = product.category_id?.toString();
        if (cateId) {
          categoryCount[cateId] = (categoryCount[cateId] || 0) + 1;
        }
      });

      // Lấy 2 categoryId phổ biến nhất
      const topCategoryIds = Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1]) // sắp xếp theo số lượng giảm dần
        .slice(0, 2)
        .map(([categoryId]) => categoryId);

      // Lấy tất cả sản phẩm thuộc 2 category phổ biến nhất
      const categoryProducts = await Product.find({
        category_id: { $in: topCategoryIds },
        deleted_at: null,
      });

      /// Gọi API chi tiết cho tất cả sản phẩm
      const productDetailResponses = await Promise.all(
        categoryProducts.map(async (p) => {
          try {
            const res = await axios.get(
              `http://localhost:3001/api/product/get-details/${p._id}`
            );
            return res.data.data; // dữ liệu chi tiết sản phẩm
          } catch (error) {
            console.error(`Lỗi khi gọi API sản phẩm ${p._id}:`, error.message);
            return null;
          }
        })
      );
      // Lọc ra các sản phẩm có dữ liệu hợp lệ và tính giá giảm nhỏ nhất trong variants
      const productsWithMinDiscountedPrice = [];

      for (const product of productDetailResponses) {
        if (!product || !Array.isArray(product.variants)) continue;

        let minDiscountedPrice = Infinity;
        for (const variant of product.variants) {
          const discountRate = (variant.discount || 0) / 100;
          const discountedPrice = variant.price * (1 - discountRate);
          if (discountedPrice < minDiscountedPrice) {
            minDiscountedPrice = discountedPrice;
          }
        }

        if (minDiscountedPrice !== Infinity) {
          productsWithMinDiscountedPrice.push({
            ...product,
            discountedPrice: minDiscountedPrice,
          });
        }
      }

      // Lấy 10 sản phẩm có giá sau giảm thấp nhất
      const bestDeals = productsWithMinDiscountedPrice
        .sort((a, b) => a.discountedPrice - b.discountedPrice)
        .slice(0, 10);

      return {
        EM: "Gợi ý sản phẩm từ đơn hàng gần đây",
        EC: 0,
        DT: bestDeals,
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
