const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const Feature = mongoose.model("feature", featureSchema);

module.exports = Feature;