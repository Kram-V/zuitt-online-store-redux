import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { ORDER_GET_RESET } from "../constants/orderConstants.js";
import {
  USER_LOGIN_RESET,
  USER_REGISTER_RESET,
} from "../constants/userConstants";
import { toast } from "react-toastify";
import { removeCartDetails } from "../actions/cartActions";

const Header = () => {
  const [name, setName] = useState("");

  const { userDetails } = useSelector((state) => state.userLogin);

  const { user } = useSelector((state) => state.updateUserDetails);

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name);
    }
  }, [user, userDetails]);

  const logoutHandler = () => {
    dispatch({ type: ORDER_GET_RESET });
    dispatch({ type: USER_LOGIN_RESET });
    dispatch({ type: USER_REGISTER_RESET });

    dispatch(logout());
    dispatch(removeCartDetails());

    navigate("/login");

    toast.success("Logged Out Successfully");
  };

  const profileLinkHandler = () => {
    navigate("/profile");

    dispatch({ type: ORDER_GET_RESET });
  };

  const cartLinkHandler = () => {
    navigate("/cart");

    dispatch({ type: ORDER_GET_RESET });
  };

  const productsLinkHandler = () => {
    navigate("/");

    dispatch({ type: ORDER_GET_RESET });
  };

  const navbarBrandHandler = () => {
    navigate("/");

    dispatch({ type: ORDER_GET_RESET });
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={navbarBrandHandler}
          >
            <img
              style={{
                width: "30px",
                height: "30px",
                marginRight: "5px",
                borderRadius: "50%",
              }}
              src={`/images/zuitt-image.jpg`}
            ></img>
            Zuitt Online Store
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* THIS IS USE TO MAKE THE ANOTHER NAV LINK GOING TO THE RIGHT */}
            <Nav className="me-auto"></Nav>

            <Nav className="nav-links">
              {userDetails && userDetails.isAdmin ? null : (
                <Nav.Link onClick={cartLinkHandler}>
                  <i className="fa-solid fa-cart-shopping"></i> Cart{" "}
                  {`(${cartItems.length})`}
                </Nav.Link>
              )}

              {!userDetails && (
                <>
                  <LinkContainer to="/">
                    <Nav.Link>Products</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <Nav.Link>login</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userDetails && userDetails.isAdmin && (
                <>
                  <LinkContainer to="/">
                    <Nav.Link>Products</Nav.Link>
                  </LinkContainer>

                  <NavDropdown title="Admin" id="admin">
                    <NavDropdown.Item onClick={profileLinkHandler}>
                      Profile
                    </NavDropdown.Item>

                    <LinkContainer to="/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              {userDetails && userDetails.isAdmin === false && (
                <>
                  <Nav.Link onClick={productsLinkHandler}>Products</Nav.Link>

                  <NavDropdown
                    title={
                      userDetails &&
                      userDetails.isAdmin === false &&
                      userDetails.name
                    }
                    id="admin"
                  >
                    <NavDropdown.Item onClick={profileLinkHandler}>
                      Profile
                    </NavDropdown.Item>

                    <LinkContainer to="/orders">
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
