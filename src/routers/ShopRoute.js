const express = require('express');
const router = express.Router();
const ShopController = require('../controllers/ShopController');

router.get('/getAll', ShopController.getAllShops);
router.post('/create', ShopController.createShop);
router.put('/update/:id', ShopController.updateShop);
router.delete('/delete/:id', ShopController.deleteShop);

module.exports = router;
