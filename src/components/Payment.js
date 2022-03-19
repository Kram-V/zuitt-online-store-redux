import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions.js";
import CheckoutSteps from "./CheckoutSteps.js";

const Payment = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const { userDetails } = useSelector((state) => state.userLogin);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    navigate("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div style={{ width: "400px", margin: "0 auto" }}>
        <h1 className="text-center">Payment Method</h1>

        <Form className="mt-4" onSubmit={submitHandler}>
          <Form.Group
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Form.Label>
              <strong>Select Method:</strong>
            </Form.Label>

            <Col>
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                name="payment-method"
                value="Paypal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-3"
              ></Form.Check>

              <div style={{ display: "flex", gap: "10px" }}>
                <Form.Check
                  type="radio"
                  label="Stripe"
                  name="payment-method"
                  value="Stripe"
                  disabled
                ></Form.Check>
                <span>( Not Available )</span>
              </div>
            </Col>
          </Form.Group>

          <div className="text-center mt-4">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Payment;
