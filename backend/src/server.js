const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const jobRoutes = require("./routes/jobRoutes");

// Create Express app
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  credentials: true, // Allow cookies (if needed)
}));
app.use(express.json());

// Use auth routes
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api",jobRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Job Board Backend is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});