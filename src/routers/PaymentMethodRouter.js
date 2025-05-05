const express = require('express');
const router = express.Router();
const PaymentMethodController = require('../controllers/PaymentMethodController');

router.post('/create', PaymentMethodController.createPaymentMethod);

module.exports = router;
