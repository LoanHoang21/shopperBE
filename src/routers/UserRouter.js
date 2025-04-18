const express = require("express");
const router = express.Router();
// const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");

// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.get('/getAllList', UserController.getAllList);
router.post('/createUser',UserController.createUser);
router.put('/updateUser',UserController.updateUser);
router.post('/deleteUser',UserController.deleteUser);

// router.get('/login',ProductController.getAllProduct);

module.exports = router;

