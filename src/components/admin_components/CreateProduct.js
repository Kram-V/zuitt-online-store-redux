import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createProduct } from "../../actions/productActions";
import FormContainer from "../FormContainer";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [filename, setFilename] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeFile = (e) => {
    setFilename(e.target.files);
  };

  useEffect(() => {
    if (
      name &&
      brand &&
      category &&
      description &&
      price &&
      countInStock &&
      filename.length > 0
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [name, brand, category, description, price, countInStock, filename]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("countInStock", countInStock);
    formData.append("image", filename[0]);

    dispatch(createProduct(formData));

    navigate("/products");

    toast.success("Product Added Successfully");
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <h1 className="text-center">Create Product</h1>

      <Form encType="multipart/form-data">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Choose Image</Form.Label>
          <Form.Control type="file" filename="image" onChange={onChangeFile} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="text-center my-3">
          <Button
            style={{ padding: "8px 25px" }}
            type="submit"
            onClick={submitHandler}
            variant="primary"
            disabled={disableBtn}
          >
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateProduct;
