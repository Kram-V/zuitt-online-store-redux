import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import {
  getProductDetailsByAdmin,
  updateProductDetailsByAdmin,
} from "../../actions/productActions";
import FormContainer from "../FormContainer";
import { toast } from "react-toastify";

const ProductDetailsEdit = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [filename, setFilename] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  const { productDetails, isLoading, error } = useSelector(
    (state) => state.getProductDetailsByAdmin
  );

  const { isLoading: updateProductDetailsIsLoading, updatedProductDetails } =
    useSelector((state) => state.updateProductDetailsByAdmin);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!productDetails || productDetails._id !== params.id) {
      dispatch(getProductDetailsByAdmin(params.id));
    } else {
      setName(productDetails.name);
      setBrand(productDetails.brand);
      setCategory(productDetails.category);
      setDescription(productDetails.description);
      setRating(productDetails.rating);
      setNumReviews(productDetails.numReviews);
      setPrice(productDetails.price);
      setCountInStock(productDetails.countInStock);
    }
  }, [dispatch, params.id, productDetails, updatedProductDetails]);

  useEffect(() => {
    if (
      name &&
      filename &&
      brand &&
      category &&
      description &&
      price &&
      countInStock
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [
    name,
    filename,
    brand,
    category,
    description,
    rating,
    numReviews,
    price,
    countInStock,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const inputData = new FormData();

    inputData.append("name", name);
    inputData.append("brand", brand);
    inputData.append("category", category);
    inputData.append("description", description);
    inputData.append("rating", rating);
    inputData.append("numReviews", numReviews);
    inputData.append("price", price);
    inputData.append("countInStock", countInStock);
    inputData.append("image", filename);

    dispatch(updateProductDetailsByAdmin(params.id, inputData));

    navigate("/products");

    toast.success("Product Updated Successfully");
  };

  return (
    <FormContainer>
      <h1 className="text-center">Edit Product</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler} encType="multipart/form-data">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="mr-5">Choose Image</Form.Label>{" "}
          {filename ? null : (
            <span style={{ color: "red" }}>
              ( Please upload the file again. )
            </span>
          )}
          <Form.Control
            type="file"
            filename="image"
            onChange={(e) => setFilename(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            disabled
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Reviews</Form.Label>
          <Form.Control
            type="number"
            value={numReviews}
            onChange={(e) => setNumReviews(e.target.value)}
            disabled
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="text-center">
          <Button
            style={{ padding: "8px 25px" }}
            type="submit"
            variant="primary"
            disabled={disableBtn}
          >
            Update
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default ProductDetailsEdit;
