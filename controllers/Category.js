// controllers/categoryController.js
const Category = require("../models/NewsCategory.Model");

exports.getAllCategories = async (req, res) => {
    try {
        // const categories = await Category.find();
        // res.json({ categories });
        const post = await Category.find({});
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch categories" });
    }
};

exports.createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = new Category({ name });
        await category.save();
        res.json({ category });
    } catch (err) {
        res.status(400).json({ error: "Unable to create category" });
    }
};
