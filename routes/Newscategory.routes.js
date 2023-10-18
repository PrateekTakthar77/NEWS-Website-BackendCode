// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/Category");

router.get("/get", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);

module.exports = router;