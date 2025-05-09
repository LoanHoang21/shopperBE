const express = require("express");
const router = express.Router();
const VoucherController = require('../controllers/VoucherController');

router.get('/getAll/', VoucherController.getAllVoucher);
router.get('/shop/:shopId', VoucherController.getVouchersByShop);
router.get('/detail/:id', VoucherController.getDetailVoucher);

module.exports = router;

