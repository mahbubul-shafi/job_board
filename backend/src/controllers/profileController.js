const User = require("../models/User");
const Job = require("../models/Job");

// Get my applications
const getMyApplications = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: 'jobApplications',
        select: 'title company location salary experience createdAt',
        options: { sort: { createdAt: -1 } } // Newest first
      });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.jobApplications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get my id
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// get all user profiles
const getAllProfiles = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// get single user profile
const getSingleProfile = async (req, res) => {
  try {
    const profile = await User.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { name, company } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, company },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getPostedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.userId });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("jobApplications");
    res.status(200).json(user.jobApplications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
module.exports = { getMyApplications, getCurrentUser, getSingleProfile, getAllProfiles, updateProfile, getPostedJobs, getAppliedJobs };
