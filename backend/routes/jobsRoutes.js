const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobsController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(jobsController.getJobs)
  .post(jobsController.createJob)
  .patch(jobsController.updateJob)
  .delete(jobsController.deleteJob);

router.route("/stats").get(jobsController.getJobStats);

module.exports = router;
