const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Job = require("../models/Job");
const { getSpecificJobs, createJob, applyJob, getSingleJob, getAllJob } = require("../controllers/jobController");

const router = express.Router();

// Create a job
router.post("/jobs", authMiddleware, createJob);

// Apply for a job
router.post("/jobs/:id/apply", authMiddleware, applyJob);

// Get a single job by ID
router.get("/jobs/:id", getSingleJob);

// Get all jobs
router.get("/jobs", getAllJob);

// get jobs posted by a specific user
router.get('/specificjobs', getSpecificJobs);

module.exports = router;