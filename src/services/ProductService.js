const Product = require("../models/ProductModel");
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
        .skip(page * limit);
      return resolve({
        status: "OK",
        message: "All Product",
        data: allProduct,
        total: totalProduct,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getDetailProduct,
  getAllProduct,
  createProduct,
};
