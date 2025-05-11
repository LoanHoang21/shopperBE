const express = require("express");
const router = express.Router();
const ShopController = require("../controllers/ShopController");
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.get('/getShopByUserId', ShopController.getShopByUserId);
router.get('/getAllShop', ShopController.getAllShops);

module.exports = router;

