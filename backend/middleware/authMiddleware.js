const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Token Failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized!");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Make sure that you are an admin to perform this action.");
  }
};

module.exports = { protect, admin };
