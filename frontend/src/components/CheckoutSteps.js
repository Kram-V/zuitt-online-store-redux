import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-5">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              <span style={{ fontSize: "20px" }}>Sign In</span>{" "}
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <span style={{ fontSize: "20px" }}>Sign In</span>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <>
            <LinkContainer to="/shipping">
              <Nav.Link>
                <span style={{ fontSize: "20px" }}>Shipping</span>
              </Nav.Link>
            </LinkContainer>
          </>
        ) : (
          <Nav.Link disabled>
            <span style={{ fontSize: "20px" }}>Shipping</span>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>
              <span style={{ fontSize: "20px" }}>Payment</span>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <span style={{ fontSize: "20px" }}>Payment</span>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>
              <span style={{ fontSize: "20px" }}>Place Order</span>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <span style={{ fontSize: "20px" }}>Place Older</span>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
