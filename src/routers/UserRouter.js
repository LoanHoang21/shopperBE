const express = require("express");
const router = express.Router();
// const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");

// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.get('/getAllUser', UserController.getAllUser);
// router.post('/createUser',UserController.createUser);
// router.put('/updateUser',UserController.updateUser);
// router.post('/deleteUser',UserController.deleteUser);
router.post('/updateFcmToken/:id', UserController.updateFcmToken)
router.get('/getDetailUser/:id', UserController.getDetailUser)
router.post('/updateSettingNoti/:id', UserController.updateSettingNoti);

// router.get('/login',ProductController.getAllProduct);

module.exports = router;

