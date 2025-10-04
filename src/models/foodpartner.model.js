const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    restaurantName: { type: String, required: true, trim: true },
    cuisine: { type: [String], default: [] },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["partner"], default: "partner" },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "foodpartners" }
);

module.exports = mongoose.model("FoodPartner", foodPartnerSchema);
