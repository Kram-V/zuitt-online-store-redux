import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productList, deleteProduct } from "../../actions/productActions.js";
import Loader from "../Loader.js";
import { PRODUCT_ADMIN_GET_RESET } from "../../constants/productConstants.js";

const ProductList = () => {
  const { products, isLoading, error } = useSelector(
    (state) => state.productList
  );

  const { userDetails } = useSelector((state) => state.userLogin);

  const { isLoading: createdProductIsLoading, createdProduct } = useSelector(
    (state) => state.createProductByAdmin
  );

  const { deletedProductDetails, isLoading: deleteProductByAdminIsLoading } =
    useSelector((state) => state.deleteProductByAdmin);

  const { isLoading: updateProductDetailsIsLoading, updatedProductDetails } =
    useSelector((state) => state.updateProductDetailsByAdmin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      dispatch(productList());
      dispatch({ type: PRODUCT_ADMIN_GET_RESET });
    }

    if (!userDetails) {
      navigate("/login");
    }

    if (userDetails && userDetails.isAdmin === false) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userDetails,
    deletedProductDetails,
    createdProduct,
    updatedProductDetails,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteProduct(id));
    }
  };

  const editHandler = (id) => {
    navigate(`/product/${id}/edit`);
  };

  if (
    isLoading ||
    createdProductIsLoading ||
    deleteProductByAdminIsLoading ||
    updateProductDetailsIsLoading
  ) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-center">Products</h1>

      <div style={{ textAlign: "right" }} className="mb-3">
        <Link to="/create/product">
          <Button>Add Product</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    className="btn-sm"
                    style={{ marginRight: "3px" }}
                    onClick={() => editHandler(product._id)}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {products.length === 0 && (
        <h4 className="text-center mt-3">NO PRODUCTS</h4>
      )}
    </div>
  );
};

export default ProductList;
