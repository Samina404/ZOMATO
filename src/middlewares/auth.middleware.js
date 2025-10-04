const FoodPartner = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If partner login
    if (decoded.role === "partner") {
      const partner = await FoodPartner.findById(decoded.id);
      if (!partner) return res.status(401).json({ message: "Food Partner not found" });
      req.foodPartner = partner;
    }

    // You could also add check for normal user if needed
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Restrict to food partners only
const foodPartnerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "partner") {
    return res.status(403).json({ message: "Access denied: Only food partners can perform this action" });
  }
  next();
};

module.exports = { authMiddleware, foodPartnerOnly };
