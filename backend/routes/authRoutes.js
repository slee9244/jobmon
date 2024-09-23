const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/login").post(loginLimiter, authController.login);
router.route("/logout").post(authController.logout);
router.route("/getCurrentUser").get(verifyJWT, authController.getCurrentUser);

module.exports = router;
