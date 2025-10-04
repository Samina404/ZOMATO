const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a food name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    category: {
      type: String,
      enum: ["starter", "main", "dessert", "drink"],
      required: true,
    },
    image: {
      type: String, // URL or file path
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodPartner",
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodPartner"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
