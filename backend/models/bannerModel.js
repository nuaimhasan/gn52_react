const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    videoLink: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Banner = mongoose.model("banner", bannerSchema);

module.exports = Banner;