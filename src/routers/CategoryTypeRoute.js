const express = require('express');
const router = express.Router();
const CategoryTypeController = require('../controllers/CategoryTypeController');

router.post('/create', CategoryTypeController.createCategoryType);
router.get('/all', CategoryTypeController.getAllCategoryTypes);

module.exports = router;
