import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  GET_ADMIN_USERS_REQUEST,
  GET_ADMIN_USERS_SUCCESS,
  GET_ADMIN_USERS_FAIL,
  DELETE_ADMIN_USER_REQUEST,
  DELETE_ADMIN_USER_SUCCESS,
  DELETE_ADMIN_USER_FAIL,
  GET_ADMIN_USER_REQUEST,
  GET_ADMIN_USER_SUCCESS,
  GET_ADMIN_USER_FAIL,
  UPDATE_ADMIN_USER_REQUEST,
  UPDATE_ADMIN_USER_FAIL,
  UPDATE_ADMIN_USER_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

export const register =
  (name, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const inputData = {
        name,
        email,
        password,
        confirmPassword,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/users/register",
        inputData,
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });

      localStorage.setItem("userDetails", JSON.stringify(response.data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const inputData = {
      email,
      password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post("/api/users/login", inputData, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });

    localStorage.setItem("userDetails", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { userDetails } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const response = await axios.get("/api/users/profile", config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ADMIN_USERS_REQUEST });

    const { userDetails } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const response = await axios.get("/api/users", config);

    dispatch({ type: GET_ADMIN_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserDetails =
  (name, email, password, confirmPassword) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const { userDetails } = getState().userLogin;

      const inputData = {
        name,
        email,
        password,
        confirmPassword,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const response = await axios.put(
        "/api/users/update/profile",
        inputData,
        config
      );

      userDetails.name = response.data.name;
      userDetails.email = response.data.email;
      userDetails.password = response.data.password;

      localStorage.setItem("userDetails", JSON.stringify(response.data));

      dispatch({ type: USER_UPDATE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUserByAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ADMIN_USER_REQUEST });

    const { userDetails } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const response = await axios.delete(`/api/users/delete/${id}`, config);

    dispatch({ type: DELETE_ADMIN_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetailsByAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ADMIN_USER_REQUEST });

    const { userDetails } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const response = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: GET_ADMIN_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserDetailsByAdmin =
  (id, data) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_ADMIN_USER_REQUEST });

      const { userDetails } = getState().userLogin;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const response = await axios.put(`/api/users/${id}`, data, config);

      dispatch({ type: UPDATE_ADMIN_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: UPDATE_ADMIN_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userDetails");

  dispatch({ type: USER_LOGOUT });
};
