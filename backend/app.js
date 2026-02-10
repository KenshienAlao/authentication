require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.js");

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// check

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API IS RUNNING",
    data: {},
  });
});

module.exports = app;
