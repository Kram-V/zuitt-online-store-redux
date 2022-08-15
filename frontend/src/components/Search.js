import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchWord, setSearchWord] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (searchWord.trim()) {
      navigate(`/search/${searchWord}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Form
        onSubmit={submitHandler}
        style={{
          width: "400px",
          margin: "0 auto",
          marginTop: "2rem",
          marginBottom: "2rem",
          border: "2px solid #cbd5e1",
          borderRadius: "10px",
        }}
      >
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Search Products"
          style={{
            borderRadius: "10px",
            border: "none",
          }}
        ></Form.Control>
      </Form>
    </>
  );
};

export default Search;
