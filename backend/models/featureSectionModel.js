const mongoose = require("mongoose");

const featureSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const FeatureSection = mongoose.model("featureSection", featureSectionSchema);

module.exports = FeatureSection;
