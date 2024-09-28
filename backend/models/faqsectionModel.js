const mongoose = require("mongoose");

const faqSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const FaqSection = mongoose.model("faqSection", faqSectionSchema);

module.exports = FaqSection;