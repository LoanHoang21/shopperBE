const express = require("express");
const router = express.Router();
// const ProductController = require("../controllers/ProductController");
const AuthController = require("../controllers/AuthController");

// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.post('/register',AuthController.register);
router.post('/login',AuthController.login);
// router.get('/login',ProductController.getAllProduct);
router.post('/logout/:id',AuthController.logout);

module.exports = router;

