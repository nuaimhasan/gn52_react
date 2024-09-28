const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    allowNull: false,
  },
  username: {
    type: String,
    allowNull: false,
    unique: true,
  },
  role: {
    type: String,
    allowNull: false,
    default: "admin",
  },
  email: {
    type: String,
    allowNull: true,
  },
  phone: {
    type: String,
    allowNull: true,
  },
  password: {
    type: String,
    allowNull: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
