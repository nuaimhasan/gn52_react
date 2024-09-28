const express = require("express");
const router = express.Router();
const {
  getBanner,
  addBanner,
  updateBanner,
} = require("../controllers/bannerController");

router.get("/all", getBanner);
router.post("/add", addBanner);
router.patch("/update/:id", updateBanner);

module.exports = router;
