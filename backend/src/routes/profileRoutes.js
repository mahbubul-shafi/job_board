const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, updateProfile, getPostedJobs, getAppliedJobs } = require("../controllers/profileController");

const router = express.Router();

// Get user profile
router.get("/profile", authMiddleware, getProfile);

// Update user profile
router.put("/profile", authMiddleware, updateProfile);

// Get jobs posted by the user (for employers)
router.get("/profile/jobs", authMiddleware, getPostedJobs);

// Get jobs applied by the user
router.get("/profile/applications", authMiddleware, getAppliedJobs);

module.exports = router;