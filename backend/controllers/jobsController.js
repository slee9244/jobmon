const Job = require("../models/Job");
const mongoose = require("mongoose");

// @desc Get all jobs or a specific job based on query parameter
// @route GET /jobs?id=jobId
// @access Private
const getJobs = async (req, res) => {
  const { id, status, jobType, search, sort } = req.query;

  if (id) {
    // Fetch a single job if `id` is provided
    const job = await Job.findById(id).exec();

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  }

  // Fetch all jobs with filters if no `id` is provided
  const query = { user: req.user.userId };

  if (status) {
    query.status = { $in: status.split(",") };
  }
  if (jobType) {
    query.jobType = { $in: jobType.split(",") };
  }
  if (search) {
    query.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  const sortOption = sort
    ? sort === "latest"
      ? { createdAt: -1 }
      : sort === "oldest"
      ? { createdAt: 1 }
      : sort === "a-z"
      ? { position: 1 }
      : sort === "z-a"
      ? { position: -1 }
      : {}
    : { createdAt: -1 }; // Default to sorting by latest if no sort parameter is provided

  const jobs = await Job.find(query).sort(sortOption);

  res.json(jobs);
};

// @desc Get jobs statistics
// @route GET /jobs/stats
// @access Private
const getJobStats = async (req, res) => {
  const userId = req.user.userId;
  const userObjectId = mongoose.Types.ObjectId.createFromHexString(userId);

  // Count jobs by status
  const jobCountByStatus = await Job.aggregate([
    { $match: { user: userObjectId } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
    { $project: { _id: 0, status: "$_id", count: 1 } },
  ]);

  // Count jobs by position
  const jobCountByPosition = await Job.aggregate([
    { $match: { user: userObjectId } },
    { $group: { _id: "$position", count: { $sum: 1 } } },
    { $project: { _id: 0, position: "$_id", count: 1 } },
  ]);

  // Count jobs applied per day for the last 30 days until today
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30); // Subtract 30 days

  const jobAppliedPerDay = await Job.aggregate([
    {
      $match: {
        user: userObjectId,
        createdAt: {
          $gte: thirtyDaysAgo,
          $lte: now, // Until today
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  if (
    !jobCountByStatus.length &&
    !jobCountByPosition.length &&
    !jobAppliedPerDay.length
  ) {
    return res.status(500).json({ message: "Error fetching job stats", error });
  }

  res.json({
    jobCountByStatus,
    jobCountByPosition,
    jobAppliedPerDay,
  });
};

// @desc Create new job
// @route POST /jobs
// @access Private
const createJob = async (req, res) => {
  const {
    position,
    company,
    location,
    salary,
    status,
    jobType,
    listingURL,
    notes,
  } = req.body;

  // Confirm data
  if (!position || !company) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create and store the new user
  const job = await Job.create({
    user: req.user.userId,
    position,
    company,
    location,
    salary,
    status,
    jobType,
    listingURL,
    notes,
  });

  if (job) {
    // Created
    return res.status(201).json({ message: "New job created" });
  } else {
    return res.status(400).json({ message: "Invalid job data received" });
  }
};

// @desc Update a job
// @route PATCH /jobs
// @access Private
const updateJob = async (req, res) => {
  const { id, position, company } = req.body;

  // Confirm data
  if (!id || !position || !company) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm job exists to update
  const job = await Job.findById(id).exec();

  if (!job) {
    return res.status(400).json({ message: "Job not found" });
  }

  await Job.findOneAndUpdate({ _id: id }, req.body);

  res.status(200).json({ message: "Job is updated" });
};

// @desc Delete a job
// @route DELETE /jobs
// @access Private
const deleteJob = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Job ID required" });
  }

  // Confirm job exists to delete
  const job = await Job.findById(id).exec();

  if (!job) {
    return res.status(400).json({ message: "Job not found" });
  }

  await job.deleteOne();

  res.status(200).json({ message: "Job is deleted" });
};

module.exports = {
  getJobs,
  getJobStats,
  createJob,
  updateJob,
  deleteJob,
};
