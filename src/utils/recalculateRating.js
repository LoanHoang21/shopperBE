// utils/recalculateRating.js

const mongoose = require("mongoose");
const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");

const recalculateRating = async (product_id) => {
  try {
    const result = await Review.aggregate([
      { $match: { product_id: new mongoose.Types.ObjectId(product_id) } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);

    const avg = result[0]?.avgRating || 0;

    console.log("🔁 Recalculated rating:", avg); // 🪵 Debug

    await Product.findByIdAndUpdate(product_id, { rating_avg: avg });

    return avg;
  } catch (err) {
    console.error("❌ Failed to recalculate rating:", err.message);
    return 0;
  }
};

module.exports = recalculateRating;
