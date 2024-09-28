const Banner = require("../models/bannerModel");

exports.addBanner = async (req, res) => {
  const data = req?.body;

  try {
    const result = await Banner.create(data);

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getBanner = async (req, res) => {
  try {
    const result = await Banner.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateBanner = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await Banner.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Banner not found",
      });
    }

    const result = await Banner.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
