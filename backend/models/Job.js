const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    location: {
      type: String,
      required: false,
      maxlength: 50,
      trim: true,
      default: "Salt Lake City, UT",
    },
    salary: {
      type: Number,
      default: 0,
      required: false,
    },
    status: {
      type: String,
      enum: ["Bookmarked", "Applied", "Interviewing", "Rejected", "Offered"],
      default: "Applied",
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote", "Internship"],
      default: "Full-time",
    },
    listingURL: {
      type: String,
      required: false,
      trim: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
