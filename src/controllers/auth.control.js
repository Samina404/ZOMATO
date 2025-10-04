const User = require('../models/user.model');
const FoodPartner = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// ---------------- USER ----------------
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed });
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ---------------- FOOD PARTNER ----------------
exports.registerFoodPartner = async (req, res) => {
    try {
        const { name, email, password, phone, address, restaurantName, cuisine } = req.body;
        if (!name || !email || !password || !phone || !address || !restaurantName)
            return res.status(400).json({ message: "All fields are required" });

        const existing = await FoodPartner.findOne({ email });
        if (existing) return res.status(400).json({ message: "Food Partner already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const partner = new FoodPartner({ name, email, password: hashed, phone, address, restaurantName, cuisine });
        await partner.save();

        const token = jwt.sign({ id: partner._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, message: "Food Partner registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginFoodPartner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const partner = await FoodPartner.findOne({ email });
        if (!partner) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, partner.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: partner._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, message: "Food Partner login successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
