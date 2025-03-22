const User = require("../models/User");
const Job = require("../models/Job");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

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
module.exports = { getProfile, updateProfile, getPostedJobs, getAppliedJobs };
