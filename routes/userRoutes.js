const express = require("express");
console.log("userRoutes loaded");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        console.log("Received:", req.body);

        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        console.log("User saved:", user);

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
router.get("/test", (req, res) => {
    res.json({
        message: "API Working"
    });
});
router.get("/register", (req, res) => {
    res.send("Register route is working");
});