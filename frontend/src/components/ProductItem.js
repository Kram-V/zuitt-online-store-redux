import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  console.log("PRODUCT ITEM", product);
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img
            style={{ width: "250px", height: "250px" }}
            src={`/images/${product.image}`}
          ></Card.Img>
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating
              productRating={product.rating}
              productReviews={product.numReviews}
            />
          </Card.Text>

          <Card.Text as="h3">PHP {product.price.toFixed(2)}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductItem;
