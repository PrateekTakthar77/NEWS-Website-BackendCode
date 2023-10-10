const router = require("express").Router();
const User = require('../models/Users');
const Post = require('../models/Post');
const bcrypt = require("bcrypt");

// Add Post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

// edit post 
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const premium = await Post.findByIdAndUpdate(id, req.body)
        if (!premium) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        const updatedPremium = await Post.findById(id);
        res.status(200).json(updatedPremium);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

// delete post
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const premium = await Post.findByIdAndDelete(id)
        if (!premium) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        const updatedPremium = await Post.findById(id);
        res.status(200).json(updatedPremium);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

// get all
router.get('/', async (req, res) => {
    try {
        const post = await Post.find({});
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = router