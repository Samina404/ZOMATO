const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const FoodPartner = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==================== USER AUTH ====================

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "User logged out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// ==================== FOODPARTNER AUTH ====================

// Register FoodPartner
const registerFoodPartner = async (req, res) => {
  const { name, email, password, phone, address, restaurantName, cuisine } =
    req.body;
  try {
    let partner = await FoodPartner.findOne({ email });
    if (partner)
      return res.status(400).json({ message: "Food Partner already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    partner = new FoodPartner({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      restaurantName,
      cuisine,
    });
    await partner.save();

    const token = jwt.sign({ id: partner._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, message: "Food Partner registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login FoodPartner
const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;
  try {
    const partner = await FoodPartner.findOne({ email });
    if (!partner)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, partner.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: partner._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, message: "Food Partner login successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Logout FoodPartner
const logoutFoodPartner = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Food Partner logged out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// ==================== ROUTES ====================

// User routes

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner
};
