import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import {
  getUserDetailsByAdmin,
  updateUserDetailsByAdmin,
} from "../../actions/userActions";
import FormContainer from "../FormContainer";
import { toast } from "react-toastify";
import { GET_ADMIN_USERS_RESET } from "../../constants/userConstants";

const UserDetailsEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  const { userDetails, isLoading, error } = useSelector(
    (state) => state.getUserDetailsByAdmin
  );

  const { success, user } = useSelector(
    (state) => state.updateUserDetailsByAdmin
  );

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails || userDetails._id !== params.id) {
      dispatch(getUserDetailsByAdmin(params.id));
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
      setIsAdmin(userDetails.isAdmin);
    }
  }, [dispatch, params.id, userDetails]);

  useEffect(() => {
    if (name && email) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [name, email]);

  if (success) {
    navigate("/users");

    toast.success("User Updated Successfully");
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const inputData = {
      name,
      email,
      isAdmin,
    };

    dispatch({ type: GET_ADMIN_USERS_RESET });

    dispatch(updateUserDetailsByAdmin(params.id, inputData));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FormContainer>
      <h1>Edit User</h1>
      {error && <Message variant="danger">{error}</Message>}
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
          <Form.Check
            type="checkbox"
            label="Make this user as an admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
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
    </FormContainer>
  );
};

export default UserDetailsEdit;
