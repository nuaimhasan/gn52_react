const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email:{
      type: String,
    },
    facebook: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
  },
  { timestamps: true }
);

const businessInfo = mongoose.model("businessInfo", businessSchema);

module.exports = businessInfo;
