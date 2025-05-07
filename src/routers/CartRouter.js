// src/routers/CartRouter.js
const express = require('express');
const CartController = require('../controllers/CartController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', CartController.createCart);
router.get('/', CartController.getCarts);
router.get('/:id', CartController.getCartById);
router.put('/:id', CartController.updateCart);
router.delete('/:id', CartController.deleteCart);
router.post('/add', CartController.addToCart);
router.get('/user/:userId', CartController.getCartItemsByUser);
router.put('/cartitems/quantity', CartController.updateQuantity);
router.post('/cartitems/delete-many', CartController.deleteMultipleCartItems);



module.exports = router;
