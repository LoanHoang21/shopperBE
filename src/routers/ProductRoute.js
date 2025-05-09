const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");
const upload = require('../middleware/upload');

router.post('/create', upload.array('images', 5), ProductController.createProduct);
router.get('/get-details/:id',ProductController.getDetailsProduct);
router.get('/getAll',ProductController.getAllProduct);
router.get('/:id/related', ProductController.getRelatedProducts);
router.post('/view/:id', ProductController.increaseViewCount);
router.get('/suggested/ml-trending', ProductController.getTrendingProductsFromML);
router.get('/search', ProductController.searchProducts);
router.get('/:id/attributions', ProductController.getProductAttributions);
router.get('/:id/variants', ProductController.getProductVariantsByProductId);

router.get('/suggested/ml-trending', ProductController.getTrendingProductsFromML);
router.get('/search', ProductController.searchProducts);
router.get('/getRecommendedProductByOrders/:id', ProductController.getRecommendedProductByOrders);
module.exports = router;

