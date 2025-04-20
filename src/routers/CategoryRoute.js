const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/create', CategoryController.createCategory);
router.get('/getAll', CategoryController.getAllCategories);
router.put('/update/:id', CategoryController.updateCategory);
router.delete('/delete/:id', CategoryController.deleteCategory);

module.exports = router;
