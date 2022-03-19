import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader.js";
import { login } from "../actions/userActions.js";
import { toast } from "react-toastify";
import { USER_LOGIN_RESET } from "../constants/userConstants.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, userDetails, error, success } = useSelector(
    (state) => state.userLogin
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
        dispatch({ type: USER_LOGIN_RESET });
      }, 500);
    }

    if (success) {
      toast.success("Logged In Successfully");
    }
  }, [userDetails, redirect, navigate, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <h1 className="text-center">Login</h1>
      <Form onSubmit={submitHandler}>
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

        <div className="text-center mt-3">
          <Button
            style={{ padding: "8px 25px" }}
            type="submit"
            variant="primary"
          >
            Sign In
          </Button>
        </div>
      </Form>

      <div className="text-center mt-3">
        <span>New Customer?</span>{" "}
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
