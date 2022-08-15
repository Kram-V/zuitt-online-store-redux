import React from "react";

const Rating = ({ productRating, productReviews }) => {
  return (
    <div className="my-3">
      <span>
        <i
          style={{ color: "#eab308" }}
          className={
            productRating >= 1
              ? "fas fa-star"
              : productRating >= 0.5
              ? "fa-solid fa-star-half-stroke"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color: "#eab308" }}
          className={
            productRating >= 2
              ? "fas fa-star"
              : productRating >= 1.5
              ? "fa-solid fa-star-half-stroke"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color: "#eab308" }}
          className={
            productRating >= 3
              ? "fas fa-star"
              : productRating >= 2.5
              ? "fa-solid fa-star-half-stroke"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color: "#eab308" }}
          className={
            productRating >= 4
              ? "fas fa-star"
              : productRating >= 3.5
              ? "fa-solid fa-star-half-stroke"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color: "#eab308" }}
          className={
            productRating >= 5
              ? "fas fa-star"
              : productRating >= 4.5
              ? "fa-solid fa-star-half-stroke"
              : "far fa-star"
          }
        ></i>
      </span>

      <span style={{ marginLeft: "10px" }}>{productReviews} Reviews</span>
    </div>
  );
};

export default Rating;
