const asyncHandler = require("express-async-handler");
const Order = require("../models/Order.js");

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).send(createdOrder);
  }
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .lean()
    .populate({ path: "user", select: { name: 1, email: 1 } });

  if (order) {
    res.status(200).send(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    // THIS IS CAME FROM THE PAYPAL API
    // order.paymentResult = {
    //   id: req.body.id,
    //   status: req.body.status,
    //   update_time: req.body.update_time,
    //   email_address: req.body.payer.email_address,
    // };

    const updatedOrder = await order.save();

    res.send(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }

  console.log(order);
});

const updateOrderTodelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAT = Date.now();

    const updatedOrder = await order.save();

    res.send(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.status(200).send(orders);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .lean()
    .populate({ path: "user", select: { id: 1, name: 1 } });

  if (orders) {
    res.status(200).send(orders);
  } else {
    res.status(404);
    throw new Error("Orders Not Found");
  }
});

module.exports = {
  createOrder,
  getOrder,
  updateOrderToPaid,
  getUserOrders,
  getOrders,
  updateOrderTodelivered,
};
