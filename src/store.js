import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
  deleteProductByAdminReducer,
  createProductByAdminReducer,
  getProductDetailsByAdminReducer,
  updateProductDetailsByAdminReducer,
  createReviewReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  userLoginReducer,
  userRegisterReducer,
  currentUserDetailsReducer,
  updateUserDetailsReducer,
  getAllUsersByAdminReducer,
  deleteUserByAdminReducer,
  getUserDetailsByAdminReducer,
  updateUserDetailsByAdminReducer,
} from "./reducers/userReducers.js";
import {
  orderCreateReducer,
  getOrderReducer,
  orderPayReducer,
  getCurrentUserOrdersReducer,
  getOrdersByAdminReducer,
  updateOrderToDeliveredByAdminReducer,
} from "./reducers/orderReducers.js";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  currentUserDetails: currentUserDetailsReducer,
  updateUserDetails: updateUserDetailsReducer,
  orderCreate: orderCreateReducer,
  getOrder: getOrderReducer,
  createReview: createReviewReducer,
  orderPay: orderPayReducer,
  getCurrentUserOrders: getCurrentUserOrdersReducer,
  getAllUsersByAdmin: getAllUsersByAdminReducer,
  getOrdersByAdmin: getOrdersByAdminReducer,
  getUserDetailsByAdmin: getUserDetailsByAdminReducer,
  getProductDetailsByAdmin: getProductDetailsByAdminReducer,
  createProductByAdmin: createProductByAdminReducer,
  updateUserDetailsByAdmin: updateUserDetailsByAdminReducer,
  updateProductDetailsByAdmin: updateProductDetailsByAdminReducer,
  updateOrderToDeliveredByAdmin: updateOrderToDeliveredByAdminReducer,
  deleteUserByAdmin: deleteUserByAdminReducer,
  deleteProductByAdmin: deleteProductByAdminReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const userDetailsFromStorage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userDetails: userDetailsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
