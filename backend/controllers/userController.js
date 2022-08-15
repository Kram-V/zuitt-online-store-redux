const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Please fill up all the fields  ");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Password and Confirm Password are not the same.");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email Already Exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data!");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please fill up all the fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.send(user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    res.send(users);
  } else {
    res.status(404);
    throw new Error("Users not found!");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Password and Confirm Password are not the same!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = hashedPassword || user.password;

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      password: updatedUser.password,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200);
    res.send(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { name, email, isAdmin } = req.body;
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    user.name = name || user.name;
    user.email = email || user.name;
    user.isAdmin = isAdmin;

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();

    res.send(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  userLogin,
  getUserProfile,
  userRegister,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserByAdmin,
};
