const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addLogo,
  updateLogo,
  getLogos,
} = require("../controllers/logoController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/logo");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("logo"), addLogo);

router.patch(
  "/update/:id",
  upload.single("logo"),
  updateLogo
);

router.get("/all", getLogos);

module.exports = router;
