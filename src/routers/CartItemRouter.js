const express = require('express');
const CartItemController = require('../controllers/CartItemController');

const router = express.Router();

router.post('/', CartItemController.create);
router.get('/', CartItemController.getAll);
router.get('/:id', CartItemController.getOne);
router.put('/:id', CartItemController.update);
router.delete('/:id', CartItemController.remove);

module.exports = router;
