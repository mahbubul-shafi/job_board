const Job = require("../models/Job");
const User = require("../models/User");

// Get job posted by a specific user
const getSpecificJobs = (req, res) => {
  const { postedBy } = req.query;
  const filter = postedBy ? { postedBy } : {};
  Job.find(filter).then(jobs => res.json(jobs));
}

// Create a job
const createJob = async (req, res) => {
  try {
    const { title, description, location, salary, experience } = req.body;

    // Fetch the logged-in user's data
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract company and employer (email) from the user
    const company = user.company;
    const employer_email = user.email;

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      experience,
      company, // Use the company from the user's data
      employer_email, // Use the employer (name) from the user's data
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

// Get single job
const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
// Get all jobs
const getAllJob = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find();

    // Send the jobs as a response
    res.status(200).json(jobs);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { getSpecificJobs, createJob, applyJob, getSingleJob, getAllJob };