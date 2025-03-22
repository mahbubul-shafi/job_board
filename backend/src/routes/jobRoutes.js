const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Job = require("../models/Job");
const { createJob, applyJob } = require("../controllers/jobController");

const router = express.Router();

// Create a job
router.post("/jobs", authMiddleware, createJob);

// Apply for a job
router.post("/jobs/:id/apply", authMiddleware, applyJob);

module.exports = router;