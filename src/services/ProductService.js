const axios = require("axios");
const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");
const JwtService = require("./JwtService");

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

      if (filter) {
        const allProductFilter = await Product.find({
          [filter[0]]: { $regex: filter[1], $options: "i" },
        });
        return resolve({
          status: "OK",
          message: "All Product",
          data: allProductFilter,
          total: totalProduct,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        return resolve({
          status: "OK",
          message: "Success",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit)
        .populate({
          path: 'category_id',
          populate: {
            path: 'shop_id',
            model: 'Shop',
            select: 'name', // chỉ lấy tên shop
          },
        })
        .lean();
      const finalProduct = allProduct.map(product => ({
        ...product,
        shop_name: product.category_id?.shop_id?.name || 'Không rõ'
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
    const res = await axios.get('http://localhost:3001/api/orderAdmin/getAll', {
      params: {
        customer_id: customerId,
      },
    });
    const orderByUser = res.data.DT;

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

      const allIds = allProductIds.map(product => product.product_id);

      // Truy vấn sản phẩm theo _id
      const products = await Product.find({ _id: { $in: allIds } }).lean();

      const categoryCount = {};
      products.forEach(product => {
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
        deleted_at: null
      });

      // Tính giá sau giảm cho từng sản phẩm
      for (const p of categoryProducts) {
        const discountRate = (p.discount || 0) / 100;
        p.discountedPrice = p.price * (1 - discountRate);
      }
      // Lấy <= 10 sản phẩm có giá sau giảm rẻ nhất
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
