const fs = require("fs");
const Favicon = require("../models/faviconModel");

exports.getFavicon = async (req, res) => {
  try {
    const result = await Favicon.findOne({});

    if (!result) {
      return res.json({
        success: false,
        message: "Favicon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "get success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.addFavicon = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    const isExited = await Favicon.findOne({});
    if (isExited?._id) {
      if (icon) {
        fs.unlink(`./uploads/favicon/${icon}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }

      return res.json({
        success: false,
        message: "Favicon already added",
      });
    }

    const result = await Favicon.create({ icon });

    res.status(200).json({
      success: true,
      message: "Favicon added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      message: "hello",
    });

    if (icon) {
      fs.unlink(`./uploads/favicon/${icon}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
};

exports.updateFavicon = async (req, res) => {
  const icon = req?.file?.filename;
  try {
    if (!icon) {
      return res.json({
        success: false,
        message: "Favicon is required",
      });
    }

    const id = req?.params?.id;

    let isExited = await Favicon.findById(id);
    if (!isExited) {
      if (icon) {
        fs.unlink(`./uploads/favicon/${icon}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }

      return res.json({
        success: false,
        message: "Favicon not found required",
      });
    }

    const isFavicon = await Favicon.findById(id);

    if (isFavicon) {
      await Favicon.findByIdAndUpdate(id, { icon: icon }, { new: true });

      fs.unlink(`./uploads/favicon/${isFavicon?.icon}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Favicon updated successfully",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    if (icon) {
      fs.unlink(`./uploads/favicon/${icon}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
};
