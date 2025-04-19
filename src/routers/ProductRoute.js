const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");
const upload = require('../middleware/upload');

router.post('/create', upload.single('image'), ProductController.createProduct);
router.get('/get-details/:id',ProductController.getDetailsProduct);
router.get('/getAll',ProductController.getAllProduct);

module.exports = router;

