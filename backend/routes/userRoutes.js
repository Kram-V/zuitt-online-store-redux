const express = require("express");
const {
  userLogin,
  userRegister,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserByAdmin,
} = require("../controllers/userController.js");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getUserById);
router.post("/login", userLogin);
router.post("/register", userRegister);
router.put("/update/profile", protect, updateUserProfile);
router.put("/:id", protect, admin, updateUserByAdmin);
router.delete("/delete/:id", protect, admin, deleteUser);

module.exports = router;
