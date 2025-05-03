// src/routers/CartRouter.js
const express = require('express');
const CartController = require('../controllers/CartController');

const router = express.Router();

router.post('/', CartController.createCart);
router.get('/', CartController.getCarts);
router.get('/:id', CartController.getCartById);
router.put('/:id', CartController.updateCart);
router.delete('/:id', CartController.deleteCart);

module.exports = router;
