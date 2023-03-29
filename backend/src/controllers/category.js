const Category = require("../models/category");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }

    req.category = category;
    next();
  });
};

exports.create = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    let category = new Category(req.body);
    let categoryInfo = await category.save();

    return res.status(201).json({
      categoryInfo: categoryInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not created",
      error: error.message,
    });
  }
};

exports.read = (req, res) => {
  try {
    res.json(req.category);
  } catch(error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    })
  }
};

exports.updateProduct = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, category) => {
    if (err)
      return res
        .status(400)
        .json({ message: "Something went wrong,category can not be updated." });
    res.json(category);
  });
};

exports.deleteProduct = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({
      message: "Category deleted",
    });
  });
};

exports.list = (req, res) => {
  try {
    const categories = Category.findAll();
    console.log(categories)

    return res.status(200).json({ lists: categories });
  } catch (err) {
    return res.status(500).json({ 
      error: err.message,
      message: "Something went wrong"
    });
  }
};
