import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message.js";
import Loader from "./Loader.js";
import { getUserDetails, updateUserDetails } from "../actions/userActions.js";
import { getUserOrders } from "../actions/orderActions.js";
import { USER_UPDATE_RESET } from "../constants/userConstants.js";
import { toast } from "react-toastify";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  const { isLoading, error } = useSelector((state) => state.currentUserDetails);

  const { isLoading: currentOrdersIsLoading, orders } = useSelector(
    (state) => state.getCurrentUserOrders
  );

  const { userDetails } = useSelector((state) => state.userLogin);

  const { success: successDetails, error: errorDetails } = useSelector(
    (state) => state.updateUserDetails
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) {
      navigate("/login");
    } else {
      dispatch(getUserDetails());
      dispatch(getUserOrders());
    }
  }, [userDetails, dispatch, navigate]);

  useEffect(() => {
    if (name && email && password && confirmPassword) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [name, email, password, confirmPassword]);

  useEffect(() => {
    if (errorDetails) {
      toast.error(errorDetails);

      setTimeout(() => {
        dispatch({ type: USER_UPDATE_RESET });
      }, 500);
    }
  }, [dispatch, errorDetails]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserDetails(name, email, password, confirmPassword));
  };

  if (error) {
    toast.error(error);
  }

  if (successDetails) {
    toast.success("User Updated Successfully");

    setPassword("");
    setConfirmPassword("");

    dispatch({ type: USER_UPDATE_RESET });
  }

  if (isLoading) {
    return <Loader />;
  }

  if (currentOrdersIsLoading) {
    return <Loader />;
  }

  if (userDetails.isAdmin) {
    return (
      <Row>
        <Col md={4}></Col>

        <Col md={4}>
          <h1 className="text-center">Update User Profile</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="text-center mt-3">
              <Button
                style={{ padding: "8px 25px" }}
                type="submit"
                variant="primary"
                disabled={disableBtn}
              >
                Update
              </Button>
            </div>
          </Form>
        </Col>

        <Col md={4}></Col>
      </Row>
    );
  } else {
    return (
      <Row>
        <Col md={3}>
          <h2 className="text-center">Update User Profile</h2>

          {successDetails && (
            <Message variant="success">Updated Successfully</Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="text-center mt-3">
              <Button
                style={{ padding: "8px 25px" }}
                type="submit"
                variant="primary"
                disabled={disableBtn}
              >
                Update
              </Button>
            </div>
          </Form>
        </Col>

        <Col md={9}>
          <h1 className="text-center">My Orders</h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>Php {order.totalPrice}</td>
                    <td>{order.isPaid ? "Paid" : "Not Paid"}</td>
                    <td>{order.isDelivered ? "Delivered" : "Not Delivered"}</td>
                    <td>
                      <Link to={`/order/${order._id}`}>View Details</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {orders.length === 0 && (
            <h4 className="text-center mt-3">NO ORDERS</h4>
          )}
        </Col>
      </Row>
    );
  }
};

export default Profile;
