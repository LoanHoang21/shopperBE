const CategoryType = require('../models/CategoryTypeModel');

const createCategoryType = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ message: 'Missing name or slug' });
    }

    const exists = await CategoryType.findOne({ slug });
    if (exists) {
      return res.status(409).json({ message: 'Slug already exists' });
    }

    const newType = await CategoryType.create({ name, slug });
    return res.status(201).json({ status: 'OK', data: newType });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getAllCategoryTypes = async (req, res) => {
  try {
    const types = await CategoryType.find();
    res.status(200).json({ status: 'OK', data: types });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCategoryType,
  getAllCategoryTypes,
};
