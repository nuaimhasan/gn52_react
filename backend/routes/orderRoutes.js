const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

const {
  addOrder,
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/create-order", addOrder);
router.get("/all-orders", getAllOrders);
router.get("/single/:id", getSingleOrder);
router.delete("/delete/:id", verifyToken, deleteOrder);
router.put("/update/status/:id", verifyToken, updateOrderStatus);

module.exports = router;
