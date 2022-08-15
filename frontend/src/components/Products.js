import React, { useEffect } from "react";
import { productList } from "../actions/productActions.js";
import { Row, Col } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader.js";
import Search from "./Search.js";
import { useParams } from "react-router-dom";

const Products = () => {
  const { products, isLoading } = useSelector((state) => state.productList);

  console.log("PRODUCTS", products);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(productList(params.word));
  }, [dispatch, params.word]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="text-center">Products</h1>
      <Search />

      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>

      {products.length === 0 && (
        <h4 className="text-center mt-3">NO PRODUCTS SHOW</h4>
      )}
    </>
  );
};

export default Products;
