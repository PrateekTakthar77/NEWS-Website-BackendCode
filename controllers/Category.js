const Category = require("../models/NewsCategory.Model");

const getAllCategories = async (req, res) => {
    try {
        const data = await Category.find({});
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch categories" });
    }
};

const createCategory = async (req, res) => {
    const { name, subcategory, status } = req.body;

    try {
        const category = new Category({ name, status, subcategory });
        await category.save();
        res.json({ category });
    } catch (err) {
        res.status(400).json({ error: "Unable to create category" });
    }
};

const getCategoryandUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Category.findByIdAndUpdate(id, req.body)
        if (!data) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        const updatedPremium = await Category.findById(id);
        res.status(200).json(updatedPremium);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}


const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body; // Correctly extract categoryId
        const catId = await Category.findByIdAndDelete(categoryId); // Use categoryId to delete
        if (catId) {
            res.json({ message: "Category deleted successfully", catId });
            console.log("Category Deleted Successfully", categoryId);
        } else {
            res.status(404).json({ payload: null, message: "Category not found" });
        }
    } catch (error) {
        res.status(500).json({ payload: null, message: error.message || "An error occurred" });
    }
}

// Function to add a subcategory to an existing category
const addSubcategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const { subcategory } = req.body;

        // Find the existing category by its ID
        const existingCategory = await Category.findById(categoryId);

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Add the subcategory to the existing category
        existingCategory.subcategory.push(subcategory);

        // Save the updated category
        await existingCategory.save();

        res.status(200).json({ message: 'Subcategory added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the subcategory' });
    }
};

module.exports = { getAllCategories, createCategory, getCategoryandUpdate, deleteCategory, addSubcategory }