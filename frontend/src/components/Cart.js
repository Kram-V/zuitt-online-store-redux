import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addItem, removeItem } from "../actions/cartActions";
import { useParams, useLocation } from "react-router-dom";

const Cart = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userDetails } = useSelector((state) => state.userLogin);

  const productId = params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addItem(productId, qty));
    }

    if (userDetails && userDetails.isAdmin) {
      navigate("/");
    }
  }, [dispatch, productId, qty, navigate, userDetails]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeItem(productId));

    navigate("/cart");
  };

  const checkOutHandler = () => {
    if (!userDetails) {
      return navigate("/login");
    }

    navigate("/shipping");
  };

  return (
    <Row>
      <h1 className="text-center mb-4">Shopping Cart</h1>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <>
            <h5 className="text-center mt-3">{`( Cart is empty )`}</h5>
            <div className="text-center">
              <Link to="/">Go Back</Link>
            </div>
          </>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => {
              return (
                <ListGroup.Item key={cartItem.productId}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={`/images/${cartItem.image}`}
                        alt={cartItem.name}
                        fluid
                        rounded
                      />
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${cartItem.productId}`}>
                        {cartItem.name}
                      </Link>
                    </Col>

                    <Col md={2}>Php {cartItem.price}</Col>

                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={cartItem.qty}
                        onChange={(e) =>
                          dispatch(
                            addItem(cartItem.productId, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(cartItem.countInStock).keys()].map((i) => {
                          return (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() =>
                          removeFromCartHandler(cartItem.productId)
                        }
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card style={{ width: "340px", margin: "0 auto" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, cartItem) => acc + cartItem.qty, 0)})
                Items
              </h2>
              PHP{" "}
              {cartItems
                .reduce(
                  (acc, cartItem) => acc + cartItem.qty * cartItem.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item className="text-center">
              <Button
                disabled={cartItems.length === 0 ? true : false}
                onClick={checkOutHandler}
                style={{ width: "100%" }}
              >
                Check Out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
