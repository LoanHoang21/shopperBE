const Category = require('../models/CategoryModel');

// 🟢 Tạo mới Category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, shop_id , type_id} = req.body;

    if (!name || !shop_id) {
      return res.status(400).json({ status: "ERR", message: "Missing required fields" });
    }


    const category = await Category.create({
      name,
      description,
      shop_id
      , type_id
    });

    res.status(201).json({ status: "OK", message: "Category created", data: category });
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};

// 📂 Lấy tất cả category chưa bị xóa (deleted_at: null)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ deleted_at: null }).populate('shop_id', 'name image');
    res.status(200).json({ status: "OK", data: categories });
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};

// 🟡 Cập nhật category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = {
      description,
      updated_at: Date.now()
    };

    if (name) {
      updateData.name = name;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!category) {
      return res.status(404).json({ status: "ERR", message: "Category not found" });
    }

    res.status(200).json({ status: "OK", message: "Updated", data: category });
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};

// 🔴 Xóa mềm category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { deleted_at: Date.now() },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ status: "ERR", message: "Category not found" });
    }

    res.status(200).json({ status: "OK", message: "Deleted", data: category });
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
