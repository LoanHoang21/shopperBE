const router = require('express').Router();
const VoucherController = require('../controllers/VoucherController');

// Create a voucher
router.post('/', VoucherController.createVoucher);

// Get all vouchers
router.get('/', VoucherController.getAllVouchers);

// Get voucher by id
router.get('/:id', VoucherController.getVoucherById);

// Update voucher
router.put('/:id', VoucherController.updateVoucher);

// Delete voucher
router.delete('/:id', VoucherController.deleteVoucher);
router.get('/shop/:shopId', VoucherController.getVouchersByShop);
    
module.exports = router;
