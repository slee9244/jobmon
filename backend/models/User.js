const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Invalid email"],
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
