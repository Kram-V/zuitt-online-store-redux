import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions.js";
import CheckoutSteps from "./CheckoutSteps.js";

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const { userDetails } = useSelector((state) => state.userLogin);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [disableBtn, setDisableBtn] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  useEffect(() => {
    if (address && city && postalCode && country) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [address, city, postalCode, country]);

  const submitHandler = (e) => {
    e.preventDefault();

    const inputData = {
      address,
      city,
      postalCode,
      country,
    };

    dispatch(saveShippingAddress(inputData));

    navigate("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <div style={{ width: "400px", margin: "0 auto" }}>
        <h1 className="text-center">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>
              <strong>Address</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <strong>City</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <strong>Postal Code</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <strong>Country</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <div className="text-center mt-3">
            <Button type="submit" disabled={disableBtn}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Shipping;
