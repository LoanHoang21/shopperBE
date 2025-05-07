const express = require('express');
const router = express.Router();
const PaymentMethodController = require('../controllers/PaymentMethodController');

router.get('/', PaymentMethodController.getAllPaymentMethods);
router.post('/', PaymentMethodController.createPaymentMethod);
router.get('/:id', PaymentMethodController.getPaymentMethodById);
module.exports = router;
