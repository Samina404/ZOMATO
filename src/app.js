const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Import your auth routes
const authRoutes = require('./routes/auth.routes');  // adjust path if needed

app.use(cookieParser());
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Use the auth routes
app.use("/api/auth", authRoutes);

module.exports = app;
