import React, { useState, useEffect } from "react";
import "./css/SingleProduct.css";
import { getProduct, createProductReview } from "../actions/productActions.js";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating.js";
import Loader from "./Loader.js";
import Message from "./Message.js";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { userDetails } = useSelector((state) => state.userLogin);

  const { product, isLoading, error } = useSelector(
    (state) => state.productDetails
  );

  console.log("PRODUUUUUUUUCT", product);

  const {
    createdReview,
    error: createdReviewError,
    isLoading: createReviewIsLoading,
  } = useSelector((state) => state.createReview);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [dispatch, params.id, createdReview]);

  if (createdReviewError) {
    toast.error(createdReviewError);

    setTimeout(() => {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }, 500);
  }

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${quantity}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const inputData = {
      rating,
      comment,
    };

    dispatch(createProductReview(params.id, inputData));

    setRating(0);
    setComment("");
  };

  if (isLoading || createReviewIsLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="single-item-container">
        <div className="sub-single-item-container">
          <Image
            style={{
              maxWidth: "100%",
              height: "300px",
            }}
            src={`/images/${product.image}`}
            alt={product.name}
          ></Image>

          <Card style={{ width: "300px", marginTop: "20px" }}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Price:</strong>
                  </Col>
                  <Col>Php {product.price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Status:</strong>
                  </Col>
                  <Col>
                    <span
                      className={`single-item-${
                        product.countInStock > 0 ? "in-stock" : "out-of-stock"
                      }`}
                    >
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>

                    <Col>
                      <Form.Control
                        as="select"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((i) => {
                          return (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className=""
                  disabled={
                    product.countInStock === 0 ||
                    (userDetails && userDetails.isAdmin)
                      ? true
                      : false
                  }
                  style={{ width: "100%" }}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>

        <div>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                productRating={product.rating}
                productReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Price:</strong> Php {product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>

      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <h2 className="text-center my-5">Reviews</h2>

          {product.reviews.length === 0 && (
            <p className="text-center">( No Reviews Show )</p>
          )}

          {userDetails && userDetails.isAdmin ? (
            <ListGroup variant="flush" className="text-center">
              {product.reviews.map((review) => {
                return (
                  <ListGroup.Item key={review._id} className="my-3">
                    <strong>{review.name}</strong>
                    <Rating productRating={review.rating}></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <ListGroup variant="flush" className="text-center">
              {product.reviews.map((review) => {
                return (
                  <ListGroup.Item key={review._id} className="my-3">
                    <strong>{review.name}</strong>
                    <Rating productRating={review.rating}></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                );
              })}

              <Row className="mt-5">
                <Col md={2}></Col>

                <Col md={8}>
                  <ListGroup.Item
                    style={{
                      border: "2px solid #cbd5e1",
                      borderRadius: "10px",
                    }}
                  >
                    <h2>Write Customer Review</h2>
                    {userDetails ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            style={{
                              border: "2px solid #cbd5e1",
                              marginBottom: "10px",
                            }}
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ border: "2px solid #cbd5e1" }}
                          ></Form.Control>
                        </Form.Group>

                        <Button type="submit" className="mt-3">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Link to="/login" style={{ textDecoration: "none" }}>
                        <Message>Please Sign In</Message>
                      </Link>
                    )}
                  </ListGroup.Item>
                </Col>
                <Col md={2}></Col>
              </Row>
            </ListGroup>
          )}
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  );
};

export default SingleProduct;
