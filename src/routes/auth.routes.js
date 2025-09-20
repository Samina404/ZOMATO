const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.control")


router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

// FoodPartner routes
router.post("/foodpartner/register", authController.registerFoodPartner);
router.post("/foodpartner/login", authController.loginFoodPartner);
router.get("/foodpartner/logout", authController.logoutFoodPartner);

module.exports= router;
