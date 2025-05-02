const express = require("express");
const router = express.Router();
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");
const NotiTypeController = require("../controllers/NotiTypeController");


router.get('/getAll', NotiTypeController.getAllNotiType);
router.get('/getQuantityNoti/:id', NotiTypeController.getQuantityNoti);
// router.get('/getDetails/:id', NotiTypeController.getDetailsNotiType);
// router.get('/getAll',ProductController.getAllProduct);

module.exports = router;

