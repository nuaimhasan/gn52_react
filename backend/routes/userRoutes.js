const router = require("express").Router();

const {
  addAdmin,
  loginUser,
  getLoggedUser,
  getUsers,
  deleteAdmin,
} = require("../controllers/userController");

const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.get("/all", verifyAdmin, getUsers);
router.post("/add-admin", addAdmin);
router.post("/login", loginUser);
router.get("/logged-user", verifyToken, getLoggedUser);
router.delete("/delete/:id", verifyAdmin, deleteAdmin);

module.exports = router;
