const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getMyApplications, getCurrentUser, getSingleProfile, getAllProfiles, updateProfile, getPostedJobs, getAppliedJobs } = require("../controllers/profileController");

const router = express.Router();

// Get my application
router.get('/me/applications', authMiddleware, getMyApplications);

// Get current profile
router.get('/me', authMiddleware, getCurrentUser);

// Get user profiles
router.get("/profiles", getAllProfiles);

// Get a single user profile
router.get("/profile/:id", getSingleProfile);

// Update user profile
router.put("/profile", authMiddleware, updateProfile);

// Get jobs posted by the user (for employers)
router.get("/profile/jobs", authMiddleware, getPostedJobs);

// Get jobs applied by the user
router.get("/profile/applications", authMiddleware, getAppliedJobs);

module.exports = router;