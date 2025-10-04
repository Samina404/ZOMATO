const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const foodRoutes = require('./routes/food.routes');
const authRoutes = require('./routes/auth.routes');

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Root route
app.get("/", (req, res) => res.send("Hello World"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

module.exports = app;
