const express = require("express");
const {
  createOrder,
  getOrder,
  updateOrderToPaid,
  updateOrderTodelivered,
  getUserOrders,
  getOrders,
} = require("../controllers/orderController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, admin, getOrders);
router.get("/myorders", protect, getUserOrders);
router.get("/:id", protect, getOrder);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderTodelivered);

module.exports = router;
