const Job = require("../models/Job");
const User = require("../models/User");

// Create a job
const createJob = async (req, res) => {
  try {
    const { title, description, location, salary, experience, company } = req.body;

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      experience,
      company,
      postedBy: req.userId, // Attach the user ID from the auth middleware
    });

    await newJob.save();

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Apply for a job
const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findById(req.userId);
    if (user.jobApplications.includes(job._id)) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    user.jobApplications.push(job._id);
    await user.save();

    res.status(200).json({ message: "Applied successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { createJob, applyJob };