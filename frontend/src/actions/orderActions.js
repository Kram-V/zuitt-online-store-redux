import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
  ORDER_GET_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDERS_GET_REQUEST,
  ORDERS_GET_SUCCESS,
  ORDERS_GET_FAIL,
  ORDERS_ADMIN_GET_REQUEST,
  ORDERS_ADMIN_GET_SUCCESS,
  ORDERS_ADMIN_GET_FAIL,
  ORDER_ADMIN_UPDATE_DELIVER_REQUEST,
  ORDER_ADMIN_UPDATE_DELIVER_SUCCESS,
  ORDER_ADMIN_UPDATE_DELIVER_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const { userDetails } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const response = await axios.post("/api/orders", order, config);

    console.log(response.data);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderGet = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_GET_REQUEST });

    const { userDetails } = getState().userLogin;
    const { paymentMethod } = getState().cart;

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    const itemsPrice = data.orderItems.reduce(
      (acc, orderDetail) => acc + orderDetail.qty * orderDetail.price,
      0
    );

    const inputData = {
      paymentMethod,
      itemsPrice,
      orderDetails: data,
    };

    console.log(inputData);

    dispatch({ type: ORDER_GET_SUCCESS, payload: inputData });
  } catch (error) {
    dispatch({
      type: ORDER_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const { userDetails } = getState().userLogin;
    const { itemsPrice } = getState().cart;
    const { paymentMethod } = getState().cart;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    console.log(data);

    const inputData = {
      paymentMethod,
      itemsPrice,
      data,
    };

    dispatch({ type: ORDER_PAY_SUCCESS, payload: inputData });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDERS_GET_REQUEST });

    const { userDetails } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({ type: ORDERS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDERS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserOrdersByAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDERS_ADMIN_GET_REQUEST });

    const { userDetails } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({ type: ORDERS_ADMIN_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDERS_ADMIN_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrderDeliveredByAdmin =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_ADMIN_UPDATE_DELIVER_REQUEST });

      const { userDetails } = getState().userLogin;

      const config = {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);

      dispatch({ type: ORDER_ADMIN_UPDATE_DELIVER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_ADMIN_UPDATE_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
