const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");
const verifyJWT = require("../middleware/verifyJWT");

// Public route for creating a user
router.post("/", usersController.createUser);

// Protected routes (require authentication)
router.use(verifyJWT);

router
  .route("/")
  .get(usersController.getUsers)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
