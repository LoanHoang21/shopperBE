const express = require("express");
const router = express.Router();
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");
const VoucherController = require('../controllers/VoucherController');

router.get('/getAll/', VoucherController.getAllVoucher);
// router.get('/getDetails/:id', NotiTypeController.getDetailsNotiType);
// router.get('/getAll',ProductController.getAllProduct);
// router.post('/create', NotiController.createNotiOrder)
router.get('/shop/:shopId', VoucherController.getVouchersByShop);

module.exports = router;

