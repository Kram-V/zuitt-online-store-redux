import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "./Loader.js";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message.js";
import { orderGet, payOrder } from "../actions/orderActions.js";
import {
  ORDER_PAY_RESET,
  ORDER_CREATE_RESET,
} from "../constants/orderConstants.js";

const Order = () => {
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  const { order, isLoading } = useSelector((state) => state.getOrder);

  const { userDetails } = useSelector((state) => state.userLogin);

  const { success } = useSelector((state) => state.orderCreate);

  const { isLoading: orderPayIsLoading, success: orderPaySuccess } =
    useSelector((state) => state.orderPay);

  const { updatedOrder } = useSelector(
    (state) => state.updateOrderToDeliveredByAdmin
  );

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);

      document.body.appendChild(script);
    };

    if (!order || orderPaySuccess) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(orderGet(params.id));
    } else if (!order.orderDetails.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, params.id, order, orderPaySuccess, updatedOrder]);

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success]);

  if (isLoading || orderPayIsLoading || !order) {
    return <Loader />;
  }

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(params.id, paymentResult));
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Id </h2>
              <p>
                {" "}
                <strong>Id: </strong>
                {order.orderDetails._id}
              </p>

              <h2>Shipping Address</h2>
              <p>
                {" "}
                <strong>Name: </strong>
                {order.orderDetails.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.orderDetails.user.email}
              </p>

              <p>
                <strong>Address: </strong>
                {order.orderDetails.shippingAddress.address},{" "}
                {order.orderDetails.shippingAddress.city},{" "}
                {order.orderDetails.shippingAddress.postalCode},{" "}
                {order.orderDetails.shippingAddress.country},{" "}
              </p>

              <p>
                <strong>Status: </strong>
                {order.orderDetails.isDelivered ? (
                  <span
                    style={{
                      backgroundColor: "#059669",
                      color: "white",
                      padding: "5px 8px",
                      borderRadius: "15px",
                    }}
                  >
                    Delivered
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: "#b91c1c",
                      color: "white",
                      padding: "5px 8px",
                      borderRadius: "15px",
                    }}
                  >
                    Not Yet Delivered
                  </span>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              <p>
                <strong>Status: </strong>
                {order.orderDetails.isPaid ? (
                  <span
                    style={{
                      backgroundColor: "#059669",
                      color: "white",
                      padding: "5px 8px",
                      borderRadius: "15px",
                    }}
                  >
                    Paid
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: "#b91c1c",
                      color: "white",
                      padding: "5px 8px",
                      borderRadius: "15px",
                    }}
                  >
                    Not Yet Paid
                  </span>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderDetails.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderDetails.orderItems.map((cartItem, i) => {
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
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total Items Price:</strong>
                  </Col>
                  <Col>Php {order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Shipping Fee:</strong>
                  </Col>
                  <Col>
                    {order.orderDetails.shippingPrice === 0
                      ? "Free"
                      : "Php " + order.orderDetails.shippingPrice.toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>Php {order.orderDetails.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item></ListGroup.Item>
              {!order.orderDetails.isPaid && userDetails.isAdmin === false && (
                <ListGroup.Item>
                  <PayPalButton
                    amount={order.orderDetails.totalPrice.toFixed(2)}
                    onSuccess={successPaymentHandler}
                  />
                </ListGroup.Item>
              )}

              {userDetails.isAdmin && null}
            </ListGroup>
          </Card>

          <p className="text-center mt-3">
            <strong>Debit or Credit Card</strong> is{" "}
            <strong>not available</strong> for payment method.
          </p>
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

export default Order;
