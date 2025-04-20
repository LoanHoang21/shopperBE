const Review = require('../models/ReviewModel');
const recalculateRating = require('../utils/recalculateRating'); // đã có

// ✅ Hàm tạo đánh giá
const createReview = async (req, res) => {
  const { rating, product_id, user_id, order_id, comment } = req.body;

  if (!rating || !product_id || !user_id || !order_id) {
    return res.status(400).json({ status: 'ERR', message: 'Missing required fields' });
  }

  try {
    await Review.create({ rating, product_id, user_id, order_id, comment });
    const rating_avg = await recalculateRating(product_id);

    return res.status(201).json({
      status: 'OK',
      message: 'Đánh giá thành công',
      data: { rating_avg }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'ERR', message: error.message });
  }
};

// ✅ Hàm lấy tất cả đánh giá theo product_id
const getReviewsByProduct = async (req, res) => {
  const { product_id } = req.params;

  if (!product_id) {
    return res.status(400).json({ status: 'ERR', message: 'Product ID is required' });
  }

  try {
    const reviews = await Review.find({ product_id }).sort({ created_at: -1 });

    return res.status(200).json({
      status: 'OK',
      data: reviews
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'ERR', message: error.message });
  }
};

// ✅ Export đầy đủ
module.exports = {
  createReview,
  getReviewsByProduct
};
