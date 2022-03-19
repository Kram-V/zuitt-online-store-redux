import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message.js";
import { createOrder } from "../actions/orderActions.js";
import { removeCartDetails } from "../actions/cartActions.js";
import CheckoutSteps from "./CheckoutSteps.js";

const PlaceOrder = () => {
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.cart
  );

  const { userDetails } = useSelector((state) => state.userLogin);

  const { order, success, error } = useSelector((state) => state.orderCreate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.shippingPrice = cart.itemsPrice > 20000 ? 0 : 500;

  const itemsPrice = cart.itemsPrice;

  const shippingPrice = cart.shippingPrice;

  cart.totalPrice = itemsPrice + shippingPrice;

  const totalPrice = cart.totalPrice;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(removeCartDetails());
    }
  }, [success, order, navigate]);

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  const placeOrderHandler = () => {
    const inputData = {
      orderItems: cartItems,
      shippingPrice: cart.shippingPrice.toFixed(2),
      itemsPrice: cart.itemsPrice.toFixed(2),
      totalPrice: cart.totalPrice.toFixed(2),
      shippingAddress,
      paymentMethod,
    };

    dispatch(createOrder(inputData));
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping Address</h3>

              <p>
                <strong>Address:</strong> {shippingAddress.address},
                {shippingAddress.city},{shippingAddress.postalCode},
                {shippingAddress.country},
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Items</h3>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((cartItem, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={`/images/${cartItem.image}`}
                              alt={cartItem.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col>
                            <Link to={`/product/${cartItem.productId}`}>
                              {cartItem.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {cartItem.qty} x {cartItem.price} ={" "}
                            {cartItem.qty * cartItem.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card style={{ width: "340px", margin: "0 auto" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total Items Price:</strong>
                  </Col>
                  <Col>Php {itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    {" "}
                    <strong>Shipping Fee:</strong>
                  </Col>
                  <Col>
                    {shippingPrice === 0
                      ? "Free"
                      : "Php " + shippingPrice.toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>Php {totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="text-center">
                <Button
                  disabled={cartItems.length === 0 ? true : false}
                  onClick={placeOrderHandler}
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <hr></hr>
      <div className="text-center my-5">
        <strong>Reminder</strong>
        <p className="mt-2">
          If the total items price is Php 20,000 above, the shipping fee will be{" "}
          <strong>free</strong>.
        </p>
      </div>
    </div>
  );
};

export default PlaceOrder;
