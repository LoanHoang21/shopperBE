const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.post('/addOrder', OrderController.createOrder);
router.get("/by-customer/:customer_id", OrderController.getOrdersByCustomerId);
router.post('/get-product-variants', OrderController.getProductVariants);
router.put('/:orderId/status', OrderController.updateOrderStatus);

module.exports = router;

