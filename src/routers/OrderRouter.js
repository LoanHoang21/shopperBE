const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const createPayment = require("../controllers/MomoController");

router.post('/addOrder', OrderController.createOrder);
router.get("/by-customer/:customer_id", OrderController.getOrdersByCustomerId);
router.post('/get-product-variants', OrderController.getProductVariants);
router.put('/:orderId/status', OrderController.updateOrderStatus);
router.post('/momo-payment', createPayment.createMomoPayment);
router.post('/ipn', createPayment.momoIpn);

module.exports = router;

