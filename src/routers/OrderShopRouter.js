const express = require("express");
const router = express.Router();
const OrderShopController = require("../controllers/OrderShopController");
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.get('/getAll', OrderShopController.getAllOrderById);
router.post('/updateStatus/:id', OrderShopController.updateStatusOrder)
router.get('/getAllOrder', OrderShopController.getAllOrder);
router.get("/getAllCustomer", OrderShopController.getAllCustomer);
// router.get("/getAllProduct", OrderShopController.getAllProduct);

module.exports = router;

