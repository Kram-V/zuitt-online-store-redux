import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
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
  PRODUCT_ADMIN_GET_RESET,
  PRODUCT_ADMIN_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../constants/productConstants.js";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { isLoading: true };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, products: action.payload, isLoading: false };
    case PRODUCT_LIST_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { isLoading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, product: action.payload, isLoading: false };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProductDetailsByAdminReducer = (
  state = { productDetails: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_ADMIN_GET_REQUEST:
      return { isLoading: true };
    case PRODUCT_ADMIN_GET_SUCCESS:
      return { ...state, productDetails: action.payload, isLoading: false };
    case PRODUCT_ADMIN_GET_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case PRODUCT_ADMIN_GET_RESET:
      return { productDetails: {} };
    default:
      return state;
  }
};

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { ...state, createdReview: action.payload, isLoading: false };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const createProductByAdminReducer = (
  state = { createdProduct: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_ADMIN_CREATE_REQUEST:
      return { isLoading: true };
    case PRODUCT_ADMIN_CREATE_SUCCESS:
      return { ...state, createdProduct: action.payload, isLoading: false };
    case PRODUCT_ADMIN_CREATE_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProductDetailsByAdminReducer = (
  state = { updatedProductDetails: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_ADMIN_UPDATE_REQUEST:
      return { isLoading: true };
    case PRODUCT_ADMIN_UPDATE_SUCCESS:
      return {
        ...state,
        updatedProductDetails: action.payload,
        success: true,
        isLoading: false,
      };
    case PRODUCT_ADMIN_UPDATE_RESET:
      return { updatedProductDetails: {} };
    case PRODUCT_ADMIN_UPDATE_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteProductByAdminReducer = (
  state = { deletedProductDetails: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_ADMIN_DELETE_REQUEST:
      return { isLoading: true };
    case PRODUCT_ADMIN_DELETE_SUCCESS:
      return {
        ...state,
        deletedProductDetails: action.payload,
        isLoading: false,
      };
    case PRODUCT_ADMIN_DELETE_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
