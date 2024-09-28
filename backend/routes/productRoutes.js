const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductById
} = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/product");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all", getProduct);
router.get("/:id", getProductById);
router.post("/add", upload.single("img"), addProduct);
router.delete("/delete/:id", deleteProduct);

router.put("/update/:id", upload.single("img"), updateProduct);

module.exports = router;
