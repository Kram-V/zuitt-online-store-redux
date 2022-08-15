import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_ADMIN_DELETE_REQUEST,
  PRODUCT_ADMIN_DELETE_SUCCESS,
  PRODUCT_ADMIN_DELETE_FAIL,
  PRODUCT_ADMIN_CREATE_REQUEST,
  PRODUCT_ADMIN_CREATE_SUCCESS,
  PRODUCT_ADMIN_CREATE_FAIL,
  PRODUCT_ADMIN_GET_REQUEST,
  PRODUCT_ADMIN_GET_SUCCESS,
  PRODUCT_ADMIN_GET_FAIL,
  PRODUCT_ADMIN_UPDATE_REQUEST,
  PRODUCT_ADMIN_UPDATE_SUCCESS,
  PRODUCT_ADMIN_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
} from "../constants/productConstants";

export const productList =
  (word = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const response = await axios.get(`/api/products?word=${word}`);

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createProduct = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADMIN_CREATE_REQUEST });

    const { userDetails } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const response = await axios.post(`/api/products`, data, config);

    dispatch({ type: PRODUCT_ADMIN_CREATE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview = (id, data) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const { userDetails } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const response = await axios.post(
      `/api/products/${id}/review`,
      data,
      config
    );

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const response = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetailsByAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADMIN_GET_REQUEST });

    const { userDetails } = getState().userLogin;

    console.log(userDetails.token);

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const response = await axios.get(`/api/products/product/${id}`, config);

    dispatch({ type: PRODUCT_ADMIN_GET_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductDetailsByAdmin =
  (id, data) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_ADMIN_UPDATE_REQUEST });

      const { userDetails } = getState().userLogin;

      console.log(userDetails.token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const response = await axios.put(`/api/products/${id}`, data, config);

      dispatch({ type: PRODUCT_ADMIN_UPDATE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: PRODUCT_ADMIN_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADMIN_DELETE_REQUEST });

    const { userDetails } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const response = await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_ADMIN_DELETE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
