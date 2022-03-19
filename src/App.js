import React from "react";
import "./App.css";
import Header from "./components/Header.js";
import Products from "./components/Products.js";
import SingleProduct from "./components/SingleProduct.js";
import Cart from "./components/Cart.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Profile from "./components/Profile.js";
import Shipping from "./components/Shipping.js";
import PlaceOrder from "./components/PlaceOrder.js";
import Payment from "./components/Payment.js";
import UsersList from "./components/admin_components/UsersList.js";
import Order from "./components/Order.js";
import UserDetailsEdit from "./components/admin_components/UserDetailsEdit.js";
import ProductDetailsEdit from "./components/admin_components/ProductDetailsEdit.js";
import ProductList from "./components/admin_components/ProductList.js";
import OrderList from "./components/admin_components/OrderList.js";
import CreateProduct from "./components/admin_components/CreateProduct.js";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/create/product" element={<CreateProduct />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/search/:word" element={<Products />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/user/:id/edit" element={<UserDetailsEdit />} />
            <Route path="/product/:id/edit" element={<ProductDetailsEdit />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/order/:id" element={<Order />} />
          </Routes>
        </Container>
      </main>

      <ToastContainer />
    </Router>
  );
}

export default App;
