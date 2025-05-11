const { StatusCodes } = require('http-status-codes');

const ProductService = require("../services/ProductService");
const JwtService = require("../services/JwtService");
const Category = require("../models/CategoryModel");
const mongoose = require('mongoose');
const Product = require('../models/ProductModel');
const ReviewProduct = require('../models/ReviewModel'); 
const ProductAttribution = require('../models/ProductAttribution');
const CategoryAttribution = require('../models/CategoryAttribution');
const Attribution = require('../models/Attribution'); 
const ProductVariant = require('../models/ProductVariantModel');

function isNumeric(value) {
  return Number.isFinite(Number(value)) && Number(value) >=0;
}

function isDiscount(value) {
  return Number(value) <=99;  
}

const createProduct = async (req, res) => {
  try {
    const {
      name, price, quantity, short_description, description,
      discount, sale_quantity, view_count, 
      barcode_id, category_id // 👈 nhận trực tiếp category_id
    } = req.body;

    const images = req.files?.map(file => file.path || file.secure_url) || [];

    // Kiểm tra thiếu trường
    if (!name || !price || !quantity || images.length === 0 || !category_id)
      {
      return res.status(400).json({ status: 'ERR', message: 'Missing required fields' });
    }

    // Kiểm tra category có tồn tại không
    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(400).json({ status: 'ERR', message: 'Invalid category_id' });
    }

    const newProduct = {
      name,
      price,
      quantity,
      sale_quantity,
      short_description,
      description,
      discount,
      view_count,
      
      barcode_id,
      images,
      category_id: category._id
    };

    const created = await ProductService.createProduct(newProduct);

    return res.status(200).json({ status: 'OK', message: 'Created', data: created });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'ERR', message: 'Server error' });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
      updated_at: Date.now()
    };

    // Nếu đổi category_id → kiểm tra trước khi gán
    if (req.body.category_id) {
      const checkCategory = await Category.findById(req.body.category_id);
      if (!checkCategory) {
        return res.status(400).json({ status: 'ERR', message: 'Invalid category_id' });
      }
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!product) {
      return res.status(404).json({ status: 'ERR', message: 'Product not found' });
    }

    res.status(200).json({ status: 'OK', message: 'Updated', data: product });
  } catch (error) {
    res.status(500).json({ status: 'ERR', message: error.message });
  }
};


const getDetailsProduct = async (req, res) => {
  try {
    const product_id = req.params.id;

    if (!product_id) {
      return res.status(400).json({
        status: 'ERR',
        message: 'Product ID is required'
      });
    }

    await Product.findByIdAndUpdate(product_id, { $inc: { view_count: 1 } });

    const product = await Product.findById(product_id).lean();
    
    if (!product) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      status: 'OK',
      data: product
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'ERR',
      message: 'Something went wrong'
    });
  }
};



const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm sản phẩm hiện tại kèm category & type_id
    const currentProduct = await Product.findById(id).populate({
      path: 'category_id',
      populate: { path: 'type_id' }
    });

    if (!currentProduct || !currentProduct.category_id?.type_id) {
      return res.status(404).json({ message: 'Product or category type not found' });
    }

    const typeId = currentProduct.category_id.type_id._id;

    // Tìm các sản phẩm khác cùng category type
    const relatedProducts = await Product.find({
      _id: { $ne: currentProduct._id }
    }).populate({
      path: 'category_id',
      match: { type_id: typeId },
      populate: { path: 'shop_id' }
    });

    res.status(200).json({
      status: 'OK',
      data: relatedProducts
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndUpdate(
      id,
      { deleted_at: Date.now() },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ status: 'ERR', message: 'Product not found' });
    }

    res.status(200).json({ status: 'OK', message: 'Deleted', data: deleted });
  } catch (error) {
    res.status(500).json({ status: 'ERR', message: error.message });
  }
};


const getAllProduct = async (req,res)=>{
  try{
     const {limit,page,sort,filter} = req.query;
     
      const response = await ProductService.getAllProduct(Number(limit) || 1000,Number(page) || 0 ,sort,filter);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const getAllProductFilter = async (req,res)=>{
  try{
     const valueFilter = req.query;
      const response = await ProductService.getAllProductFilter(valueFilter);
      // const response = await ProductService.getAllProduct();
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}
const increaseViewCount = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, { $inc: { view_count: 1 } });
    return res.status(200).json({ status: 'OK', message: 'View count updated' });
  } catch (error) {
    return res.status(500).json({ status: 'ERR', message: error.message });
  }
};
// const getTrendingProductsFromML = async (req, res) => {
//   try {
//     const allProducts = await Product.find().lean();

//     const payload = allProducts.map(p => ({
//       product_id: p._id,
//       rating_avg: p.rating_avg || 0,
//       sale_quantity: p.sale_quantity || 0,
//       view_count: p.view_count || 0,
//     }));

//     const response = await axios.get('http://192.168.112.101:5000/predict-trending-from-db');


//     const trendingIds = response.data.map(item => item.product_id);

//     const trendingProducts = allProducts
//       .filter(p => trendingIds.includes(p._id.toString()))
//       .map(p => ({
//         _id: p._id,
//         name: p.name,
//         images: p.images || [],
//         price: p.price,
//         discount: p.discount,
//         rating_avg: p.rating_avg,
//       }));

//     res.status(200).json({ status: 'OK', data: trendingProducts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: 'ERR',
//       message: 'Không lấy được sản phẩm trending',
//     });
//   }
// };
const getTrendingProductsFromML = async (req, res) => {
 try {
    const topTrending = await Product.find(
      { trending_score: { $exists: true } },
      {
        _id: 1,
        name: 1,
        images: 1,
        price: 1,
        discount: 1,
        rating_avg: 1,
        trending_score: 1
      }
    )
      .sort({ trending_score: -1 })
      .limit(4)
      .lean();

    return res.status(200).json({
      status: 'OK',
      data: topTrending
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'ERR',
      message: 'Không lấy được sản phẩm trending từ DB'
    });
  }
};

const removeAccents = require('remove-accents');

const searchProducts = async (req, res) => {
  try {
    const query = removeAccents(req.query.query || '').toLowerCase();

    // populate để lấy shop name
    const allProducts = await Product.find()
      .populate({
        path: 'category_id',
        populate: { path: 'shop_id' }
      })
      .lean();

    const filtered = allProducts.filter(p =>
      removeAccents(p.name || '').toLowerCase().includes(query)
    );

    // Thêm shop_name vào kết quả trả về
    const result = filtered.map(p => ({
      ...p,
      shop_name: p.category_id?.shop_id?.name || 'Không rõ'
    }));

    res.status(200).json({
      status: 'OK',
      data: result.slice(0, 20)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'ERR',
      message: 'Lỗi tìm kiếm sản phẩm'
    });
  }
};

const getProductAttributions = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 'ERR',
        message: 'Invalid product ID',
      });
    }

    // Lấy danh sách các nhóm phân loại mà sản phẩm thuộc về
    const productAttributions = await ProductAttribution.find({
      product_id: id,
      deleted_at: null
    }).lean();

    const categoryAttrIds = productAttributions.map(pa => pa.category_attribution_id);

    // Lấy thông tin từng category + các giá trị attribution của nó
    const categories = await CategoryAttribution.find({
      _id: { $in: categoryAttrIds }
    }).lean();

    const attributions = await Attribution.find({
      category_attribution_id: { $in: categoryAttrIds }
    }).lean();

    // Gộp lại thành dạng:
    // [{ category: 'Màu sắc', values: ['Đỏ', 'Xanh'] }, ...]
    const result = categories.map(cat => {
      const values = attributions
        .filter(attr => String(attr.category_attribution_id) === String(cat._id))
        .map(attr => attr.name);

      return {
        category: cat.name,
        values
      };
    });

    return res.status(200).json({
      status: 'OK',
      data: result
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'ERR',
      message: 'Server error while fetching attributions'
    });
  }
};


const getProductVariantsByProductId = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).lean();
    const variants = await ProductVariant.find({ product_id: id }).lean();

    return res.status(200).json({
      status: 'OK',
      data: {
        ...product,
        variants
      }
    });
  } catch (error) {
    return res.status(500).json({ status: 'ERR', message: error.message });
  }
};


// const removeAccents = require('remove-accents');

const getRecommendedProductByOrders = async (req, res) => {
  try {
      const customerId = req.query.customer_id;
      let data = await ProductService.getRecommendedProductByOrders(customerId);
      return res.status(200).json({
          EM: data.EM, // error message
          EC: data.EC, // error code
          DT: data.DT, // data
      });
  } catch (error) {
      console.log(e);
      return res.status(500).json({ 
          EM: 'error from server',
          EC: '-1',
          DT: '',
      });
  }
};


module.exports = {
  increaseViewCount,
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  getRelatedProducts,
  getAllProductFilter,
  increaseViewCount,
  searchProducts,
  getTrendingProductsFromML,
  getProductAttributions,
  getProductVariantsByProductId,
  getRecommendedProductByOrders,
};
