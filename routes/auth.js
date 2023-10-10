const router = require("express").Router();
const User = require('../models/Users');
const bcrypt = require("bcrypt");
// register
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newuser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            role: req.body.role
        });
        const user = await newuser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})
// login 
router.post("/login", async (req, res) => {
    try {
        // const { password, email } = req.body;

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid mobile or password or not a Admin" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        // const isEmailVerified = user.isEmailVerified;

        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: "Invalid mobile or password or not a user" });
        }
        // if (!isEmailVerified) {
        //   return res.status(401).json({ message: "Email not verified" });
        // }
        if (user.role !== "Admin") {
            return res.status(401).json({ message: "You are not an admin" });
        }
        // const token = generateJwtToken(payload);
        const { password, ...others } = user._doc
        res.status(200).json({ others });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router