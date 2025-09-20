const mongoose = require("mongoose");

// Define schema for a food partner / restaurant
const foodPartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
     
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },
    cuisine: {
      type: [String], // Array of cuisines
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "foodpartners",
  }
);

// Export model
const foodPartnerModel= mongoose.model("FoodPartner", foodPartnerSchema);
module.exports=foodPartnerModel;
