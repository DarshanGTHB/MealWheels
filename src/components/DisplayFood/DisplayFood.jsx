import React, { useContext } from "react";
import "./DisplayFood.css";
import StoreContext from "../../context/storeContext";
import FoodItem from "../FoodItem/FoodItem";

export const DisplayFood = () => {
  let { foodList } = useContext(StoreContext);
//   console.log(foodList);
  return (
    <div className="food-display">
      <ul className="food-list">
        {foodList.map((tup, id) => {
          return <FoodItem food_item={tup} key={id}/>;
        })}
      </ul>
    </div>
  );
};
