const router = require("express").Router();
const Post = require('../models/Post');

// Add Post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
});


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
        var time = new Date();
        let call = (time.toLocaleString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }));
        console.log(`🛰️  API request to get all artcles at ${call}`)
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

// Get a single item by ID
router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id; // Extract the item ID from the URL parameter
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/news/latest', async (req, res) => {
    try {
        const post = await Post.find({});
        post.reverse() // we are reversing the array so the latest one appear first 
        var time = new Date();
        let call = (time.toLocaleString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }));
        console.log(`🛰️  API request to get all latest artcles at ${call} `)
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/related-posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const relatedPosts = await Post.find({ category: { $in: post.category }, _id: { $ne: postId } });
        relatedPosts.reverse()
        res.json(relatedPosts);
        var time = new Date();
        let call = (time.toLocaleString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }));
        console.log(`🛰️  API request to get related artcles at ${call} `)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Get a single item by SEO title
router.get('/seotitle/:engtitle', async (req, res) => {
    try {
        const seoTitle = req.params.engtitle; // Extract the SEO title from the URL parameter
        const post = await Post.findOne({ engtitle: seoTitle });

        if (!post) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router