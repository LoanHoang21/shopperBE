const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController'); 

router.post('/create', ReviewController.createReview);
router.get('/product/:productId', ReviewController.getReviewsByProduct);

module.exports = router;
