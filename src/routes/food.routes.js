const express = require("express");
const router = express.Router();
const {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require("../controllers/food.controller");

const { authMiddleware, foodPartnerOnly } = require("../middlewares/auth.middleware");

// Public routes
router.get("/", getAllFoods);
router.get("/:id", getFoodById);

// Protected routes (only food partners can create/update/delete)
router.post("/", authMiddleware, foodPartnerOnly, createFood);
router.put("/:id", authMiddleware, foodPartnerOnly, updateFood);
router.delete("/:id", authMiddleware, foodPartnerOnly, deleteFood);

module.exports = router;
