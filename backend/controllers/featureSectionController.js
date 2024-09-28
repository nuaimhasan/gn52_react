const FeatureSection = require("../models/featureSectionModel");

exports.add = async (req, res) => {
  const data = req?.body;
  try {
    const result = await FeatureSection.create(data);

    res.status(201).json({
      success: true,
      message: "add success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await FeatureSection.findOne({});

    if (!result) {
      return res.status(202).json({
        success: false,
        error: "not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await FeatureSection.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "not found",
      });
    }

    const result = await FeatureSection.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "updated success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
