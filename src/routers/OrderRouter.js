const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.get('/getAll/:id', OrderController.getAllOrderById);
router.post('/updateStatus/:id', OrderController.updateStatusOrder)
// router.get('/getDetails/:id', NotiTypeController.getDetailsNotiType);
// router.get('/getAll',ProductController.getAllProduct);

module.exports = router;

