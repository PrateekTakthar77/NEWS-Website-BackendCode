const router = require("express").Router();
const Category = require('../models/Category');

router.post('/', async (req, res) => {
    const saveCat = new Category(req.body)
    try {
        const newCat = await saveCat.save();
        res.status(200).json(newCat);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

// get all
router.get('/', async (req, res) => {
    try {
        const cat = await Category.find({});
        res.status(200).json(cat)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router