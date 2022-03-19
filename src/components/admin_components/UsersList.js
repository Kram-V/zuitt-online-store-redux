import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader.js";
import { getAllUsers, deleteUserByAdmin } from "../../actions/userActions.js";
import {
  UPDATE_ADMIN_USER_RESET,
  GET_ADMIN_USER_RESET,
} from "../../constants/userConstants.js";

const UsersList = () => {
  const { users, isLoading, error } = useSelector(
    (state) => state.getAllUsersByAdmin
  );

  const { userDetails } = useSelector((state) => state.userLogin);

  const { deletedUserDetails, isLoading: deleteUserByAdminIsLoading } =
    useSelector((state) => state.deleteUserByAdmin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      dispatch(getAllUsers());
      dispatch({ type: UPDATE_ADMIN_USER_RESET });
      dispatch({ type: GET_ADMIN_USER_RESET });
    }

    if (!userDetails) {
      navigate("/login");
    }

    if (userDetails && userDetails.isAdmin === false) {
      navigate("/");
    }
  }, [dispatch, navigate, userDetails, deletedUserDetails]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteUserByAdmin(id));
    }
  };

  const editHandler = (id) => {
    navigate(`/user/${id}/edit`);
  };

  if (isLoading || deleteUserByAdminIsLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-center">Users List</h1>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            if (
              userDetails &&
              userDetails.isAdmin &&
              userDetails._id === user._id
            ) {
              return null;
            } else {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Admin" : "Non-Admin"}</td>
                  <td>
                    <Button
                      style={{ marginRight: "3px" }}
                      className="btn-sm"
                      onClick={() => editHandler(user._id)}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                      disabled
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>

      {users.length === 1 && <h4 className="text-center mt-3">NO USERS</h4>}
    </div>
  );
};

export default UsersList;
