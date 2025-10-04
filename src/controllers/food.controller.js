const Food = require("../models/food.model");

// ✅ Create new food (only food partners can do this)
const createFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const newFood = await Food.create({
      name,
      description,
      price,
      category,
      image,
      createdBy: req.foodPartner._id, // comes from authMiddleware
    });

    res.status(201).json({ success: true, data: newFood });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("createdBy", "name email");
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get food by ID
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate("createdBy", "name email");
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update food (only creator can update)
const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    if (food.createdBy.toString() !== req.foodPartner._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedFood });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete food (only creator can delete)
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    if (food.createdBy.toString() !== req.foodPartner._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await food.remove();
    res.status(200).json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
