const Feature = require("../models/featureModel");
const fs = require("fs");

exports.addFeature = async (req, res) => {
  try {
    const { title } = req.body;
    const icon = req.file ? req.file.filename : null;

    const newFeature = new Feature({
      title,
      icon,
    });

    const result = await newFeature.save();

    res.status(200).json({
      success: true,
      message: "Feature added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getFeatureById = async (req, res) => {
  try {
    const featureId = req.params.id;

    const feature = await Feature.findById(featureId);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found",
      });
    }

    res.status(200).json({
      success: true,
      data: feature,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getFeatures = async (req, res) => {
  try {
    const features = await Feature.find();

    res.status(200).json({
      success: true,
      data: features,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const featureId = req.params.id;
    const { title } = req.body;
    const icon = req.file ? req.file.filename : null;

    const feature = await Feature.findById(featureId);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found",
      });
    }

    if (icon) {
      if (feature.icon) {
        fs.unlinkSync(`./uploads/feature/${feature.icon}`); // Delete old icon
      }
      feature.icon = icon;
    }

    feature.title = title || feature.title;

    const updatedFeature = await feature.save();

    res.status(200).json({
      success: true,
      message: "Feature updated successfully",
      data: updatedFeature,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const featureId = req.params.id;

    const feature = await Feature.findById(featureId);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found",
      });
    }

    let result = await Feature.findByIdAndDelete(featureId);

    if (result?._id) {
      if (feature.icon) {
        fs.unlinkSync(`./uploads/feature/${feature.icon}`);
      }

      res.status(200).json({
        success: true,
        message: "Feature deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
