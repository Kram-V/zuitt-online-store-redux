const asyncHandler = require("express-async-handler");
const Product = require("../models/Product.js");

const getProducts = asyncHandler(async (req, res) => {
  const word = req.query.word
    ? {
        name: {
          $regex: req.query.word,
          $options: "i",
        },
      }
    : {};

  const products = await Product.find({ ...word });

  res.send(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200);
    res.send(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = req.file.originalname;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.send(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }

  res.status(201).send(createdProduct);
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  const product = new Product({
    user: req.user._id,
    name,
    price,
    image: req.file.originalname,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).send(createdProduct);
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (!rating || !comment) {
      res.status(400);
      throw new Error("Please fill up all the fields");
    }

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).send(product.reviews);
  } else {
    res.status(401);
    throw new Error("No Review Added");
  }

  res.status(201).send(createdProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();

    res.send(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

module.exports = {
  getProducts,
  getProduct,
  getProductById,
  createProduct,
  createProductReview,
  updateProduct,
  deleteProduct,
};
