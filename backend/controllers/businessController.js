const Business = require("../models/businessModel");

exports.addBusiness = async (req, res) => {
  const data = req?.body;
  try {
    const result = await Business.create(data);

    res.status(201).json({
      success: true,
      message: "BusinessInfo created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getBusiness = async (req, res) => {
  try {
    const result = await Business.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Business not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Business fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateBusiness = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await Business.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Business not found",
      });
    }

    const result = await Business.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Business updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
