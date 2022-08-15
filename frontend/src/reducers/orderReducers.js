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
  ORDER_PAY_RESET,
  ORDERS_GET_REQUEST,
  ORDERS_GET_SUCCESS,
  ORDERS_GET_FAIL,
  ORDER_CREATE_RESET,
  ORDER_GET_RESET,
  ORDERS_ADMIN_GET_REQUEST,
  ORDERS_ADMIN_GET_SUCCESS,
  ORDERS_ADMIN_GET_FAIL,
  ORDER_ADMIN_UPDATE_DELIVER_REQUEST,
  ORDER_ADMIN_UPDATE_DELIVER_SUCCESS,
  ORDER_ADMIN_UPDATE_DELIVER_FAIL,
  ORDER_ADMIN_UPDATE_DELIVER_RESET,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, isLoading: true };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const getOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_GET_REQUEST:
      return { ...state, isLoading: true };

    case ORDER_GET_SUCCESS:
      return {
        ...state,
        order: action.payload,
        success: true,
        isLoading: false,
      };

    case ORDER_GET_FAIL:
      return {
        error: action.payload,
        isLoading: false,
        success: false,
      };

    case ORDER_GET_RESET:
      return {};

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { ...state, isLoading: true };

    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
      };

    case ORDER_PAY_FAIL:
      return { ...state, error: action.payload, isLoading: false };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const getCurrentUserOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_GET_REQUEST:
      return { isLoading: true };

    case ORDERS_GET_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        success: true,
        isLoading: false,
      };

    case ORDERS_GET_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        success: false,
      };

    default:
      return state;
  }
};

export const getOrdersByAdminReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_ADMIN_GET_REQUEST:
      return { isLoading: true };

    case ORDERS_ADMIN_GET_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
      };

    case ORDERS_ADMIN_GET_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const updateOrderToDeliveredByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_UPDATE_DELIVER_REQUEST:
      return { ...state, isLoading: true };

    case ORDER_ADMIN_UPDATE_DELIVER_SUCCESS:
      return {
        ...state,
        updatedOrder: action.payload,
        isLoading: false,
        success: true,
      };

    case ORDER_ADMIN_UPDATE_DELIVER_RESET:
      return {};

    case ORDER_ADMIN_UPDATE_DELIVER_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
