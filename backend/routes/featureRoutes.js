const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addFeature,
  getFeatures,
  updateFeature,
  getFeatureById,
  deleteFeature
} = require("../controllers/featureController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/feature");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/all", getFeatures);
router.post("/add", upload.single("icon"), addFeature);
router.get("/:id", getFeatureById);
router.delete("/delete/:id", deleteFeature);
router.put("/update/:id", upload.single("icon"), updateFeature);

module.exports = router;
