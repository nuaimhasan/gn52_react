const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Logo = mongoose.model("logo", logoSchema);

module.exports = Logo;
