import React from "react";
import "./FoodItem.css";
import Rating from '@mui/material/Rating';

const FoodItem = ({ food_item }) => {
  // console.log(" ", food_item)
  const { _id, name, image, price, description } = food_item;
  return (
    <div className="food-item-card">
      <div className="food-img-wrap">
        <img src={image} alt={name} className="food-img" />
          <button className="add-btn">+</button>
      </div>
      <div className="food-info">
        <div className="name-rating">
          <h3 className="food-title">{name}</h3>
          <div className="rating">
            <Rating name="half-rating-read" defaultValue={4.5} precision={0.1} readOnly size="small"/>
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
