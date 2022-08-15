const express = require("express");
const multer = require("multer");
const {
  getProducts,
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontend/public/images");
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/product/:id", protect, admin, getProductById);
router.post("/", protect, admin, upload.single("image"), createProduct);
router.post("/:id/review", protect, createProductReview);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
