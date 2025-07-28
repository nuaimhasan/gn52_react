const fs = require("fs");
const Logo = require("../models/logoModel");

exports.addLogo = async (req, res) => {
  const logo = req?.file?.filename;

  try {
    const result = await Logo.create({ logo });

    res.status(200).json({
      success: true,
      message: "Logo added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/logo/${logo}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.getLogos = async (req, res) => {
  try {
    const logo = await Logo.find({});

    if (!logo) {
      return res.json({
        success: false,
        message: "Logo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo found successfully",
      data: logo,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateLogo = async (req, res) => {
  const logo = req?.file?.filename;

  try {
    if (!logo) {
      return res.json({
        success: false,
        message: "Logo is required",
      });
    }

    const id = req?.params?.id;
    const isLogo = await Logo.findOne({ _id: id });

    if (isLogo) {
      await Logo.findByIdAndUpdate(id, { logo: logo }, { new: true });

      fs.unlink(`./uploads/logo/${isLogo?.logo}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Logo updated successfully",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/logo/${logo}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};
