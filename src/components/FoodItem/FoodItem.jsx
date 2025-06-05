import React, { useState } from "react";
import "./FoodItem.css";
import Rating from "@mui/material/Rating";
import { useContext } from "react";
import StoreContext from "../../context/storeContext";

const FoodItem = ({ food_item }) => {
  let { incCartItem, decCartItem, cart } = useContext(StoreContext);
  // console.log(" ", food_item)
  let [cnt, setCnt] = useState(0);
  const { _id, name, image, price, description } = food_item;
  // console.log(cart);
  return (
    <div className="food-item-card">
      <div className="food-img-wrap">
        <img src={image} alt={name} className="food-img" />

        <button
          className={`add-btn-${cart[_id] ? 1 : 0}`}
          onClick={() => {
            incCartItem(_id);
          }}
        >
          +
        </button>

        {cart[_id] ? (
          <>
            <button className="dec-btn" onClick={() => decCartItem(_id)}>
              -
            </button>
            <div className="white-bcg">{cart[_id]}</div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="food-info">
        <div className="name-rating">
          <h3 className="food-title">{name}</h3>
          <div className="rating">
            <Rating
              name="half-rating-read"
              defaultValue={4.5}
              precision={0.1}
              readOnly
              size="small"
            />
          </div>
        </div>
        <p className="food-desc">{description}</p>
        <div className="food-bottom">
          <span className="food-price">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
