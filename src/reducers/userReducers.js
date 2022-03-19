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
  UPDATE_ADMIN_USER_REQUEST,
  UPDATE_ADMIN_USER_SUCCESS,
  UPDATE_ADMIN_USER_FAIL,
  GET_ADMIN_USER_REQUEST,
  GET_ADMIN_USER_SUCCESS,
  GET_ADMIN_USER_FAIL,
  GET_ADMIN_USER_RESET,
  GET_ADMIN_USERS_RESET,
  UPDATE_ADMIN_USER_RESET,
  USER_UPDATE_RESET,
  USER_LOGIN_RESET,
  USER_REGISTER_RESET,
  USER_DETAILS_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { isLoading: true };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        isLoading: false,
        success: true,
      };

    case USER_LOGIN_RESET:
      return {};

    case USER_LOGIN_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    case USER_LOGOUT:
      return { ...state, userDetails: null };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { isLoading: true };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        isLoading: false,
        success: true,
      };

    case USER_REGISTER_RESET:
      return {};

    case USER_REGISTER_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const currentUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { isLoading: true };

    case USER_DETAILS_SUCCESS:
      return { ...state, user: action.payload, isLoading: false };

    case USER_DETAILS_RESET:
      return { user: {} };

    case USER_DETAILS_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const updateUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { isLoading: true };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        success: true,
      };

    case USER_UPDATE_RESET:
      return {};

    case USER_UPDATE_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const getAllUsersByAdminReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ADMIN_USERS_REQUEST:
      return { isLoading: true };

    case GET_ADMIN_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };

    case GET_ADMIN_USERS_RESET:
      return { users: [] };

    case GET_ADMIN_USERS_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const getUserDetailsByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADMIN_USER_REQUEST:
      return { isLoading: true };

    case GET_ADMIN_USER_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        isLoading: false,
      };

    case GET_ADMIN_USER_RESET:
      return {};

    case GET_ADMIN_USER_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const updateUserDetailsByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_USER_REQUEST:
      return { isLoading: true };

    case UPDATE_ADMIN_USER_SUCCESS:
      return {
        ...state,
        updatedUser: action.payload,
        isLoading: false,
        success: true,
      };

    case UPDATE_ADMIN_USER_RESET:
      return {};

    case UPDATE_ADMIN_USER_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteUserByAdminReducer = (
  state = { deletedUserDetails: {} },
  action
) => {
  switch (action.type) {
    case DELETE_ADMIN_USER_REQUEST:
      return { isLoading: true };

    case DELETE_ADMIN_USER_SUCCESS:
      return {
        ...state,
        deletedUserDetails: action.payload,
        isLoading: false,
      };

    case DELETE_ADMIN_USER_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
