const express = require("express");
const router = express.Router();
const {
    getBusiness,
    addBusiness,
    updateBusiness,
} = require("../controllers/businessController");

router.get("/all", getBusiness);
router.post("/add", addBusiness);
router.patch("/update/:id", updateBusiness);

module.exports = router;
