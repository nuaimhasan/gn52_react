const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    facebook: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    shipping: {
      insideDhaka: {
        type: Number,
        required: true,
      },
      outsideDhaka: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const businessInfo = mongoose.model("businessInfo", businessSchema);

module.exports = businessInfo;
