const User = require("../models/userModel");
const { createJsonWebToken } = require("../utils/jsonwebtoken");
const bcrypt = require("bcrypt");

exports.addAdmin = async (req, res) => {
  try {
    const { name, username, password, phone, email, role } = req.body;

    const isExisted = await User.findOne({ username: username });

    if (isExisted) {
      return res.status(400).json({
        success: false,
        message: "User already exist.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const bcrypt_password = await bcrypt.hash(password, salt);
    const result = await User.create({
      name,
      username,
      phone,
      email,
      role,
      password: bcrypt_password,
    });

    res.status(200).json({
      success: true,
      message: "user create success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

 const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        error: "Administrator not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Administrator deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 2. Load User
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    // 3. Match Password
    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Email or password is incorrect",
      });
    }

    // 5. generate token
    let accessToken = createJsonWebToken({ username, password }, "6h");

    res.status(200).json({
      success: true,
      message: "Login Success",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getLoggedUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });

    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const result = await User.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Administrators not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All administrators get success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
