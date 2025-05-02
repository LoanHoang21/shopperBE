const express = require("express");
const router = express.Router();
const OrderAdminController = require("../controllers/OrderAdminController");
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.get('/getAll/:id', OrderAdminController.getAllOrderById);
router.post('/updateStatus/:id', OrderAdminController.updateStatusOrder)
// router.get('/getDetails/:id', NotiTypeController.getDetailsNotiType);
// router.get('/getAll',ProductController.getAllProduct);

module.exports = router;

