import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader.js";
import { register } from "../actions/userActions.js";
import { toast } from "react-toastify";
import { USER_REGISTER_RESET } from "../constants/userConstants.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoading, userDetails, error, success } = useSelector(
    (state) => state.userRegister
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userDetails) {
      navigate(redirect);
    }

    if (error) {
      toast.error(error);

      setTimeout(() => {
        dispatch({ type: USER_REGISTER_RESET });
      }, 500);
    }

    if (success) {
      toast.success("Registered and Logged In Successfully");
    }
  }, [userDetails, redirect, navigate, error, dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(name, email, password, confirmPassword));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <h1 className="text-center">Register</h1>
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
          >
            Sign Up
          </Button>
        </div>
      </Form>

      <div className="text-center mt-3">
        <span>Have already an account?</span>{" "}
        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
