import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserOrdersByAdmin,
  updateOrderDeliveredByAdmin,
} from "../../actions/orderActions.js";
import Loader from "../Loader.js";
import {
  ORDER_ADMIN_UPDATE_DELIVER_RESET,
  ORDER_GET_RESET,
} from "../../constants/orderConstants.js";
import { toast } from "react-toastify";

const OrderList = () => {
  const { userDetails } = useSelector((state) => state.userLogin);

  const { orders, isLoading } = useSelector((state) => state.getOrdersByAdmin);

  const { updatedOrder, success } = useSelector(
    (state) => state.updateOrderToDeliveredByAdmin
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      dispatch(getUserOrdersByAdmin());
      dispatch({ type: ORDER_ADMIN_UPDATE_DELIVER_RESET });
      dispatch({ type: ORDER_GET_RESET });
    }

    if (success) {
      toast.success("Delivered Status Updated Successfully");
    }

    if (!userDetails) {
      navigate("/login");
    }

    if (userDetails && userDetails.isAdmin === false) {
      navigate("/");
    }
  }, [dispatch, navigate, userDetails, updatedOrder]);

  const deliverHandler = (id) => {
    dispatch(updateOrderDeliveredByAdmin(id));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-center">Customer's Orders</h1>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>CUSTOMERS</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.isPaid ? "Paid" : "Not Paid"}</td>
                <td>{order.isDelivered ? "Delivered" : "Not Delivered"}</td>
                <td>
                  <Button
                    disabled={order.isDelivered}
                    onClick={() => deliverHandler(order._id)}
                    style={{ padding: "5px 10px" }}
                  >
                    Deliver
                  </Button>
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>Details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {orders.length === 0 && <h4 className="text-center mt-3">NO ORDERS</h4>}
    </div>
  );
};

export default OrderList;
